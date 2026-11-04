import {
  NavBar,
  NavBarItem,
  RadioButton,
  RadioButtonGroup,
  SafeAreaScope,
  ScreenFlatList,
  ScreenScrollView,
  ScreenSectionList,
  Separator,
  Switch,
  Text,
  View,
  useSafeAreaInsets,
  useScreenSafeAreaPadding,
} from "alouette";
import { Link } from "expo-router";
import { type ReactElement, type ReactNode, useState } from "react";
import type { DimensionValue } from "react-native";

type Variant = "empty" | "flat" | "scroll" | "section";

export type DemoHref = "/" | "/no-header" | "/transparent-header";

const rowCount = 24;

interface DemoRowProps {
  index: number;
}

function DemoRow({ index }: DemoRowProps): ReactNode {
  const isEdge = index === 0 || index === rowCount - 1;
  return (
    <View className={isEdge ? "bg-accent p-m" : "bg-surface p-m"}>
      <Text className={isEdge ? "text-on-accent" : "text-sharp"}>
        {isEdge
          ? `Edge row ${index + 1} — must stay clear of the system bar`
          : `Row ${index + 1}`}
      </Text>
    </View>
  );
}

function formatPadding(value: DimensionValue | undefined): string {
  return typeof value === "number" ? String(value) : "0";
}

interface TopOverlayToggleProps {
  headerHeight: number;
  applied: boolean;
  onAppliedChange: (applied: boolean) => void;
}

function TopOverlayToggle({
  headerHeight,
  applied,
  onAppliedChange,
}: TopOverlayToggleProps): ReactNode {
  return (
    <View className="flex-row items-center gap-sm">
      <Switch checked={applied} onValueChange={onAppliedChange} />
      <Text className="text-sm">
        {`SafeAreaScope topOverlayHeight={${headerHeight}}`}
      </Text>
    </View>
  );
}

interface InsetsReadoutProps {
  title: string;
  href: DemoHref;
  variant: Variant;
  onVariantChange: (variant: Variant) => void;
  consumeTop: boolean;
  onConsumeTopChange: (consumeTop: boolean) => void;
  topOverlayToggle: ReactNode;
}

function InsetsReadout({
  title,
  href,
  variant,
  onVariantChange,
  consumeTop,
  onConsumeTopChange,
  topOverlayToggle,
}: InsetsReadoutProps): ReactNode {
  const insets = useSafeAreaInsets();
  const padding = useScreenSafeAreaPadding();

  return (
    <View className="gap-m p-m">
      <Text className="font-heading-bold text-xl">{title}</Text>

      <View className="gap-xxs">
        <Text className="font-mono text-xs">
          {`insets  top ${insets.top} · bottom ${insets.bottom} · left ${insets.left} · right ${insets.right}`}
        </Text>
        <Text className="font-mono text-xs">
          {`padding top ${formatPadding(padding?.paddingTop)} · bottom ${formatPadding(padding?.paddingBottom)} · left ${formatPadding(padding?.paddingLeft)} · right ${formatPadding(padding?.paddingRight)}`}
        </Text>
        <Text className="font-mono text-xs text-muted">
          On iOS without topOverlayHeight, UIKit insets the top and bottom
          instead of this padding.
        </Text>
      </View>

      <Separator />

      <RadioButtonGroup
        value={variant}
        onValueChange={(value) => {
          onVariantChange(value as Variant);
        }}
      >
        <RadioButton value="scroll" label="ScrollView" />
        <RadioButton value="flat" label="FlatList" />
        <RadioButton value="section" label="SectionList" />
        <RadioButton value="empty" label="Empty" />
      </RadioButtonGroup>

      <View className="flex-row items-center gap-sm">
        <Switch checked={consumeTop} onValueChange={onConsumeTopChange} />
        <Text className="text-sm">
          SafeAreaScope consumedEdges=[&quot;top&quot;]
        </Text>
      </View>

      {topOverlayToggle}

      <NavBar aria-label="Demo pages" orientation="vertical" value={href}>
        <Link asChild href="/">
          <NavBarItem label="With header" />
        </Link>
        <Link asChild href="/transparent-header">
          <NavBarItem label="Transparent header" />
        </Link>
        <Link asChild href="/no-header">
          <NavBarItem label="Without header" />
        </Link>
      </NavBar>
    </View>
  );
}

interface DemoScreenProps {
  variant: Variant;
  readout: ReactElement;
}

function DemoScreen({ variant, readout }: DemoScreenProps): ReactNode {
  switch (variant) {
    case "flat":
      return (
        <ScreenFlatList
          data={Array.from({ length: rowCount }, (_, index) => index)}
          keyExtractor={String}
          ListHeaderComponent={readout}
          renderItem={({ item }) => <DemoRow index={item} />}
        />
      );
    case "section":
      return (
        <ScreenSectionList
          sections={[
            {
              title: "First half",
              data: Array.from({ length: rowCount / 2 }, (_, index) => index),
            },
            {
              title: "Second half",
              data: Array.from(
                { length: rowCount / 2 },
                (_, index) => index + rowCount / 2,
              ),
            },
          ]}
          keyExtractor={String}
          ListHeaderComponent={readout}
          renderSectionHeader={({ section }) => (
            <View className="bg-lowered px-m py-xs">
              <Text className="font-body-bold text-sm">{section.title}</Text>
            </View>
          )}
          renderItem={({ item }) => <DemoRow index={item} />}
        />
      );
    case "scroll":
      return (
        <ScreenScrollView>
          {readout}
          {Array.from({ length: rowCount }, (_, index) => (
            <DemoRow key={index} index={index} />
          ))}
        </ScreenScrollView>
      );
    case "empty":
    default:
      return (
        <ScreenScrollView>
          {readout}
          <View className="flex-center">
            <Text>Empty.</Text>
          </View>
        </ScreenScrollView>
      );
  }
}

export interface InsetsDemoProps {
  title: string;
  href: DemoHref;
  /** The header height, on a screen whose header is transparent. */
  headerHeight?: number;
}

export function InsetsDemo({
  title,
  href,
  headerHeight,
}: InsetsDemoProps): ReactNode {
  const [variant, setVariant] = useState<Variant>("scroll");
  const [consumeTop, setConsumeTop] = useState(false);
  const [applyTopOverlay, setApplyTopOverlay] = useState(true);

  return (
    <SafeAreaScope
      consumedEdges={consumeTop ? ["top"] : []}
      topOverlayHeight={applyTopOverlay ? headerHeight : undefined}
    >
      <DemoScreen
        variant={variant}
        readout={
          <InsetsReadout
            consumeTop={consumeTop}
            href={href}
            title={title}
            topOverlayToggle={
              headerHeight === undefined ? null : (
                <TopOverlayToggle
                  applied={applyTopOverlay}
                  headerHeight={headerHeight}
                  onAppliedChange={setApplyTopOverlay}
                />
              )
            }
            variant={variant}
            onConsumeTopChange={setConsumeTop}
            onVariantChange={setVariant}
          />
        }
      />
    </SafeAreaScope>
  );
}
