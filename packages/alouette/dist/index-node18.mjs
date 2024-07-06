import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { styled, View, useStyle, Text, useConfiguration, useMedia, TamaguiProvider } from '@tamagui/core';
export { Theme, View } from '@tamagui/core';
import { createContext, useContext, Children } from 'react';
import '@phosphor-icons/core/assets/regular/address-book.svg';
import '@phosphor-icons/core/assets/fill/address-book-fill.svg';
import '@phosphor-icons/core/assets/regular/air-traffic-control.svg';
import '@phosphor-icons/core/assets/fill/air-traffic-control-fill.svg';
import '@phosphor-icons/core/assets/regular/airplane.svg';
import '@phosphor-icons/core/assets/fill/airplane-fill.svg';
import '@phosphor-icons/core/assets/regular/airplane-in-flight.svg';
import '@phosphor-icons/core/assets/fill/airplane-in-flight-fill.svg';
import '@phosphor-icons/core/assets/regular/airplane-landing.svg';
import '@phosphor-icons/core/assets/fill/airplane-landing-fill.svg';
import '@phosphor-icons/core/assets/regular/airplane-takeoff.svg';
import '@phosphor-icons/core/assets/fill/airplane-takeoff-fill.svg';
import '@phosphor-icons/core/assets/regular/airplane-tilt.svg';
import '@phosphor-icons/core/assets/fill/airplane-tilt-fill.svg';
import '@phosphor-icons/core/assets/regular/airplay.svg';
import '@phosphor-icons/core/assets/fill/airplay-fill.svg';
import '@phosphor-icons/core/assets/regular/alarm.svg';
import '@phosphor-icons/core/assets/fill/alarm-fill.svg';
import '@phosphor-icons/core/assets/regular/alien.svg';
import '@phosphor-icons/core/assets/fill/alien-fill.svg';
import '@phosphor-icons/core/assets/regular/align-bottom.svg';
import '@phosphor-icons/core/assets/fill/align-bottom-fill.svg';
import '@phosphor-icons/core/assets/regular/align-bottom-simple.svg';
import '@phosphor-icons/core/assets/fill/align-bottom-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/align-center-horizontal.svg';
import '@phosphor-icons/core/assets/fill/align-center-horizontal-fill.svg';
import '@phosphor-icons/core/assets/regular/align-center-horizontal-simple.svg';
import '@phosphor-icons/core/assets/fill/align-center-horizontal-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/align-center-vertical.svg';
import '@phosphor-icons/core/assets/fill/align-center-vertical-fill.svg';
import '@phosphor-icons/core/assets/regular/align-center-vertical-simple.svg';
import '@phosphor-icons/core/assets/fill/align-center-vertical-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/align-left.svg';
import '@phosphor-icons/core/assets/fill/align-left-fill.svg';
import '@phosphor-icons/core/assets/regular/align-left-simple.svg';
import '@phosphor-icons/core/assets/fill/align-left-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/align-right.svg';
import '@phosphor-icons/core/assets/fill/align-right-fill.svg';
import '@phosphor-icons/core/assets/regular/align-right-simple.svg';
import '@phosphor-icons/core/assets/fill/align-right-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/align-top.svg';
import '@phosphor-icons/core/assets/fill/align-top-fill.svg';
import '@phosphor-icons/core/assets/regular/align-top-simple.svg';
import '@phosphor-icons/core/assets/fill/align-top-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/amazon-logo.svg';
import '@phosphor-icons/core/assets/fill/amazon-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/anchor.svg';
import '@phosphor-icons/core/assets/fill/anchor-fill.svg';
import '@phosphor-icons/core/assets/regular/anchor-simple.svg';
import '@phosphor-icons/core/assets/fill/anchor-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/android-logo.svg';
import '@phosphor-icons/core/assets/fill/android-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/angular-logo.svg';
import '@phosphor-icons/core/assets/fill/angular-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/aperture.svg';
import '@phosphor-icons/core/assets/fill/aperture-fill.svg';
import '@phosphor-icons/core/assets/regular/app-store-logo.svg';
import '@phosphor-icons/core/assets/fill/app-store-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/app-window.svg';
import '@phosphor-icons/core/assets/fill/app-window-fill.svg';
import '@phosphor-icons/core/assets/regular/apple-logo.svg';
import '@phosphor-icons/core/assets/fill/apple-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/apple-podcasts-logo.svg';
import '@phosphor-icons/core/assets/fill/apple-podcasts-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/archive.svg';
import '@phosphor-icons/core/assets/fill/archive-fill.svg';
import '@phosphor-icons/core/assets/regular/archive-box.svg';
import '@phosphor-icons/core/assets/fill/archive-box-fill.svg';
import '@phosphor-icons/core/assets/regular/archive-tray.svg';
import '@phosphor-icons/core/assets/fill/archive-tray-fill.svg';
import '@phosphor-icons/core/assets/regular/armchair.svg';
import '@phosphor-icons/core/assets/fill/armchair-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-arc-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-arc-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-arc-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-arc-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-bend-double-up-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-bend-double-up-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-bend-double-up-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-bend-double-up-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-bend-down-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-bend-down-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-bend-down-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-bend-down-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-bend-left-down.svg';
import '@phosphor-icons/core/assets/fill/arrow-bend-left-down-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-bend-left-up.svg';
import '@phosphor-icons/core/assets/fill/arrow-bend-left-up-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-bend-right-down.svg';
import '@phosphor-icons/core/assets/fill/arrow-bend-right-down-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-bend-right-up.svg';
import '@phosphor-icons/core/assets/fill/arrow-bend-right-up-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-bend-up-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-bend-up-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-bend-up-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-bend-up-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-circle-down.svg';
import '@phosphor-icons/core/assets/fill/arrow-circle-down-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-circle-down-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-circle-down-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-circle-down-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-circle-down-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-circle-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-circle-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-circle-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-circle-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-circle-up.svg';
import '@phosphor-icons/core/assets/fill/arrow-circle-up-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-circle-up-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-circle-up-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-circle-up-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-circle-up-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-clockwise.svg';
import '@phosphor-icons/core/assets/fill/arrow-clockwise-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-counter-clockwise.svg';
import '@phosphor-icons/core/assets/fill/arrow-counter-clockwise-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-down.svg';
import '@phosphor-icons/core/assets/fill/arrow-down-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-down-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-down-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-down-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-down-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-elbow-down-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-elbow-down-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-elbow-down-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-elbow-down-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-elbow-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-elbow-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-elbow-left-down.svg';
import '@phosphor-icons/core/assets/fill/arrow-elbow-left-down-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-elbow-left-up.svg';
import '@phosphor-icons/core/assets/fill/arrow-elbow-left-up-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-elbow-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-elbow-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-elbow-right-down.svg';
import '@phosphor-icons/core/assets/fill/arrow-elbow-right-down-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-elbow-right-up.svg';
import '@phosphor-icons/core/assets/fill/arrow-elbow-right-up-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-elbow-up-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-elbow-up-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-elbow-up-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-elbow-up-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-fat-down.svg';
import '@phosphor-icons/core/assets/fill/arrow-fat-down-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-fat-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-fat-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-fat-line-down.svg';
import '@phosphor-icons/core/assets/fill/arrow-fat-line-down-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-fat-line-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-fat-line-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-fat-line-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-fat-line-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-fat-line-up.svg';
import '@phosphor-icons/core/assets/fill/arrow-fat-line-up-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-fat-lines-down.svg';
import '@phosphor-icons/core/assets/fill/arrow-fat-lines-down-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-fat-lines-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-fat-lines-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-fat-lines-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-fat-lines-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-fat-lines-up.svg';
import '@phosphor-icons/core/assets/fill/arrow-fat-lines-up-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-fat-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-fat-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-fat-up.svg';
import '@phosphor-icons/core/assets/fill/arrow-fat-up-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-line-down.svg';
import '@phosphor-icons/core/assets/fill/arrow-line-down-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-line-down-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-line-down-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-line-down-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-line-down-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-line-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-line-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-line-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-line-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-line-up.svg';
import '@phosphor-icons/core/assets/fill/arrow-line-up-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-line-up-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-line-up-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-line-up-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-line-up-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-square-down.svg';
import '@phosphor-icons/core/assets/fill/arrow-square-down-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-square-down-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-square-down-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-square-down-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-square-down-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-square-in.svg';
import '@phosphor-icons/core/assets/fill/arrow-square-in-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-square-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-square-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-square-out.svg';
import '@phosphor-icons/core/assets/fill/arrow-square-out-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-square-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-square-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-square-up.svg';
import '@phosphor-icons/core/assets/fill/arrow-square-up-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-square-up-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-square-up-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-square-up-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-square-up-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-u-down-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-u-down-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-u-down-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-u-down-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-u-left-down.svg';
import '@phosphor-icons/core/assets/fill/arrow-u-left-down-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-u-left-up.svg';
import '@phosphor-icons/core/assets/fill/arrow-u-left-up-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-u-right-down.svg';
import '@phosphor-icons/core/assets/fill/arrow-u-right-down-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-u-right-up.svg';
import '@phosphor-icons/core/assets/fill/arrow-u-right-up-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-u-up-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-u-up-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-u-up-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-u-up-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-up.svg';
import '@phosphor-icons/core/assets/fill/arrow-up-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-up-left.svg';
import '@phosphor-icons/core/assets/fill/arrow-up-left-fill.svg';
import '@phosphor-icons/core/assets/regular/arrow-up-right.svg';
import '@phosphor-icons/core/assets/fill/arrow-up-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-clockwise.svg';
import '@phosphor-icons/core/assets/fill/arrows-clockwise-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-counter-clockwise.svg';
import '@phosphor-icons/core/assets/fill/arrows-counter-clockwise-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-down-up.svg';
import '@phosphor-icons/core/assets/fill/arrows-down-up-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-horizontal.svg';
import '@phosphor-icons/core/assets/fill/arrows-horizontal-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-in.svg';
import '@phosphor-icons/core/assets/fill/arrows-in-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-in-cardinal.svg';
import '@phosphor-icons/core/assets/fill/arrows-in-cardinal-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-in-line-horizontal.svg';
import '@phosphor-icons/core/assets/fill/arrows-in-line-horizontal-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-in-line-vertical.svg';
import '@phosphor-icons/core/assets/fill/arrows-in-line-vertical-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-in-simple.svg';
import '@phosphor-icons/core/assets/fill/arrows-in-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-left-right.svg';
import '@phosphor-icons/core/assets/fill/arrows-left-right-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-merge.svg';
import '@phosphor-icons/core/assets/fill/arrows-merge-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-out.svg';
import '@phosphor-icons/core/assets/fill/arrows-out-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-out-cardinal.svg';
import '@phosphor-icons/core/assets/fill/arrows-out-cardinal-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-out-line-horizontal.svg';
import '@phosphor-icons/core/assets/fill/arrows-out-line-horizontal-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-out-line-vertical.svg';
import '@phosphor-icons/core/assets/fill/arrows-out-line-vertical-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-out-simple.svg';
import '@phosphor-icons/core/assets/fill/arrows-out-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-split.svg';
import '@phosphor-icons/core/assets/fill/arrows-split-fill.svg';
import '@phosphor-icons/core/assets/regular/arrows-vertical.svg';
import '@phosphor-icons/core/assets/fill/arrows-vertical-fill.svg';
import '@phosphor-icons/core/assets/regular/article.svg';
import '@phosphor-icons/core/assets/fill/article-fill.svg';
import '@phosphor-icons/core/assets/regular/article-medium.svg';
import '@phosphor-icons/core/assets/fill/article-medium-fill.svg';
import '@phosphor-icons/core/assets/regular/article-ny-times.svg';
import '@phosphor-icons/core/assets/fill/article-ny-times-fill.svg';
import '@phosphor-icons/core/assets/regular/asterisk.svg';
import '@phosphor-icons/core/assets/fill/asterisk-fill.svg';
import '@phosphor-icons/core/assets/regular/asterisk-simple.svg';
import '@phosphor-icons/core/assets/fill/asterisk-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/at.svg';
import '@phosphor-icons/core/assets/fill/at-fill.svg';
import '@phosphor-icons/core/assets/regular/atom.svg';
import '@phosphor-icons/core/assets/fill/atom-fill.svg';
import '@phosphor-icons/core/assets/regular/baby.svg';
import '@phosphor-icons/core/assets/fill/baby-fill.svg';
import '@phosphor-icons/core/assets/regular/backpack.svg';
import '@phosphor-icons/core/assets/fill/backpack-fill.svg';
import '@phosphor-icons/core/assets/regular/backspace.svg';
import '@phosphor-icons/core/assets/fill/backspace-fill.svg';
import '@phosphor-icons/core/assets/regular/bag.svg';
import '@phosphor-icons/core/assets/fill/bag-fill.svg';
import '@phosphor-icons/core/assets/regular/bag-simple.svg';
import '@phosphor-icons/core/assets/fill/bag-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/balloon.svg';
import '@phosphor-icons/core/assets/fill/balloon-fill.svg';
import '@phosphor-icons/core/assets/regular/bandaids.svg';
import '@phosphor-icons/core/assets/fill/bandaids-fill.svg';
import '@phosphor-icons/core/assets/regular/bank.svg';
import '@phosphor-icons/core/assets/fill/bank-fill.svg';
import '@phosphor-icons/core/assets/regular/barbell.svg';
import '@phosphor-icons/core/assets/fill/barbell-fill.svg';
import '@phosphor-icons/core/assets/regular/barcode.svg';
import '@phosphor-icons/core/assets/fill/barcode-fill.svg';
import '@phosphor-icons/core/assets/regular/barricade.svg';
import '@phosphor-icons/core/assets/fill/barricade-fill.svg';
import '@phosphor-icons/core/assets/regular/baseball.svg';
import '@phosphor-icons/core/assets/fill/baseball-fill.svg';
import '@phosphor-icons/core/assets/regular/baseball-cap.svg';
import '@phosphor-icons/core/assets/fill/baseball-cap-fill.svg';
import '@phosphor-icons/core/assets/regular/basket.svg';
import '@phosphor-icons/core/assets/fill/basket-fill.svg';
import '@phosphor-icons/core/assets/regular/basketball.svg';
import '@phosphor-icons/core/assets/fill/basketball-fill.svg';
import '@phosphor-icons/core/assets/regular/bathtub.svg';
import '@phosphor-icons/core/assets/fill/bathtub-fill.svg';
import '@phosphor-icons/core/assets/regular/battery-charging.svg';
import '@phosphor-icons/core/assets/fill/battery-charging-fill.svg';
import '@phosphor-icons/core/assets/regular/battery-charging-vertical.svg';
import '@phosphor-icons/core/assets/fill/battery-charging-vertical-fill.svg';
import '@phosphor-icons/core/assets/regular/battery-empty.svg';
import '@phosphor-icons/core/assets/fill/battery-empty-fill.svg';
import '@phosphor-icons/core/assets/regular/battery-full.svg';
import '@phosphor-icons/core/assets/fill/battery-full-fill.svg';
import '@phosphor-icons/core/assets/regular/battery-high.svg';
import '@phosphor-icons/core/assets/fill/battery-high-fill.svg';
import '@phosphor-icons/core/assets/regular/battery-low.svg';
import '@phosphor-icons/core/assets/fill/battery-low-fill.svg';
import '@phosphor-icons/core/assets/regular/battery-medium.svg';
import '@phosphor-icons/core/assets/fill/battery-medium-fill.svg';
import '@phosphor-icons/core/assets/regular/battery-plus.svg';
import '@phosphor-icons/core/assets/fill/battery-plus-fill.svg';
import '@phosphor-icons/core/assets/regular/battery-plus-vertical.svg';
import '@phosphor-icons/core/assets/fill/battery-plus-vertical-fill.svg';
import '@phosphor-icons/core/assets/regular/battery-vertical-empty.svg';
import '@phosphor-icons/core/assets/fill/battery-vertical-empty-fill.svg';
import '@phosphor-icons/core/assets/regular/battery-vertical-full.svg';
import '@phosphor-icons/core/assets/fill/battery-vertical-full-fill.svg';
import '@phosphor-icons/core/assets/regular/battery-vertical-high.svg';
import '@phosphor-icons/core/assets/fill/battery-vertical-high-fill.svg';
import '@phosphor-icons/core/assets/regular/battery-vertical-low.svg';
import '@phosphor-icons/core/assets/fill/battery-vertical-low-fill.svg';
import '@phosphor-icons/core/assets/regular/battery-vertical-medium.svg';
import '@phosphor-icons/core/assets/fill/battery-vertical-medium-fill.svg';
import '@phosphor-icons/core/assets/regular/battery-warning.svg';
import '@phosphor-icons/core/assets/fill/battery-warning-fill.svg';
import '@phosphor-icons/core/assets/regular/battery-warning-vertical.svg';
import '@phosphor-icons/core/assets/fill/battery-warning-vertical-fill.svg';
import '@phosphor-icons/core/assets/regular/bed.svg';
import '@phosphor-icons/core/assets/fill/bed-fill.svg';
import '@phosphor-icons/core/assets/regular/beer-bottle.svg';
import '@phosphor-icons/core/assets/fill/beer-bottle-fill.svg';
import '@phosphor-icons/core/assets/regular/beer-stein.svg';
import '@phosphor-icons/core/assets/fill/beer-stein-fill.svg';
import '@phosphor-icons/core/assets/regular/behance-logo.svg';
import '@phosphor-icons/core/assets/fill/behance-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/bell.svg';
import '@phosphor-icons/core/assets/fill/bell-fill.svg';
import '@phosphor-icons/core/assets/regular/bell-ringing.svg';
import '@phosphor-icons/core/assets/fill/bell-ringing-fill.svg';
import '@phosphor-icons/core/assets/regular/bell-simple.svg';
import '@phosphor-icons/core/assets/fill/bell-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/bell-simple-ringing.svg';
import '@phosphor-icons/core/assets/fill/bell-simple-ringing-fill.svg';
import '@phosphor-icons/core/assets/regular/bell-simple-slash.svg';
import '@phosphor-icons/core/assets/fill/bell-simple-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/bell-simple-z.svg';
import '@phosphor-icons/core/assets/fill/bell-simple-z-fill.svg';
import '@phosphor-icons/core/assets/regular/bell-slash.svg';
import '@phosphor-icons/core/assets/fill/bell-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/bell-z.svg';
import '@phosphor-icons/core/assets/fill/bell-z-fill.svg';
import '@phosphor-icons/core/assets/regular/bezier-curve.svg';
import '@phosphor-icons/core/assets/fill/bezier-curve-fill.svg';
import '@phosphor-icons/core/assets/regular/bicycle.svg';
import '@phosphor-icons/core/assets/fill/bicycle-fill.svg';
import '@phosphor-icons/core/assets/regular/binoculars.svg';
import '@phosphor-icons/core/assets/fill/binoculars-fill.svg';
import '@phosphor-icons/core/assets/regular/bird.svg';
import '@phosphor-icons/core/assets/fill/bird-fill.svg';
import '@phosphor-icons/core/assets/regular/bluetooth.svg';
import '@phosphor-icons/core/assets/fill/bluetooth-fill.svg';
import '@phosphor-icons/core/assets/regular/bluetooth-connected.svg';
import '@phosphor-icons/core/assets/fill/bluetooth-connected-fill.svg';
import '@phosphor-icons/core/assets/regular/bluetooth-slash.svg';
import '@phosphor-icons/core/assets/fill/bluetooth-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/bluetooth-x.svg';
import '@phosphor-icons/core/assets/fill/bluetooth-x-fill.svg';
import '@phosphor-icons/core/assets/regular/boat.svg';
import '@phosphor-icons/core/assets/fill/boat-fill.svg';
import '@phosphor-icons/core/assets/regular/bone.svg';
import '@phosphor-icons/core/assets/fill/bone-fill.svg';
import '@phosphor-icons/core/assets/regular/book.svg';
import '@phosphor-icons/core/assets/fill/book-fill.svg';
import '@phosphor-icons/core/assets/regular/book-bookmark.svg';
import '@phosphor-icons/core/assets/fill/book-bookmark-fill.svg';
import '@phosphor-icons/core/assets/regular/book-open.svg';
import '@phosphor-icons/core/assets/fill/book-open-fill.svg';
import '@phosphor-icons/core/assets/regular/book-open-text.svg';
import '@phosphor-icons/core/assets/fill/book-open-text-fill.svg';
import '@phosphor-icons/core/assets/regular/bookmark.svg';
import '@phosphor-icons/core/assets/fill/bookmark-fill.svg';
import '@phosphor-icons/core/assets/regular/bookmark-simple.svg';
import '@phosphor-icons/core/assets/fill/bookmark-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/bookmarks.svg';
import '@phosphor-icons/core/assets/fill/bookmarks-fill.svg';
import '@phosphor-icons/core/assets/regular/bookmarks-simple.svg';
import '@phosphor-icons/core/assets/fill/bookmarks-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/books.svg';
import '@phosphor-icons/core/assets/fill/books-fill.svg';
import '@phosphor-icons/core/assets/regular/boot.svg';
import '@phosphor-icons/core/assets/fill/boot-fill.svg';
import '@phosphor-icons/core/assets/regular/bounding-box.svg';
import '@phosphor-icons/core/assets/fill/bounding-box-fill.svg';
import '@phosphor-icons/core/assets/regular/bowl-food.svg';
import '@phosphor-icons/core/assets/fill/bowl-food-fill.svg';
import '@phosphor-icons/core/assets/regular/brackets-angle.svg';
import '@phosphor-icons/core/assets/fill/brackets-angle-fill.svg';
import '@phosphor-icons/core/assets/regular/brackets-curly.svg';
import '@phosphor-icons/core/assets/fill/brackets-curly-fill.svg';
import '@phosphor-icons/core/assets/regular/brackets-round.svg';
import '@phosphor-icons/core/assets/fill/brackets-round-fill.svg';
import '@phosphor-icons/core/assets/regular/brackets-square.svg';
import '@phosphor-icons/core/assets/fill/brackets-square-fill.svg';
import '@phosphor-icons/core/assets/regular/brain.svg';
import '@phosphor-icons/core/assets/fill/brain-fill.svg';
import '@phosphor-icons/core/assets/regular/brandy.svg';
import '@phosphor-icons/core/assets/fill/brandy-fill.svg';
import '@phosphor-icons/core/assets/regular/bridge.svg';
import '@phosphor-icons/core/assets/fill/bridge-fill.svg';
import '@phosphor-icons/core/assets/regular/briefcase.svg';
import '@phosphor-icons/core/assets/fill/briefcase-fill.svg';
import '@phosphor-icons/core/assets/regular/briefcase-metal.svg';
import '@phosphor-icons/core/assets/fill/briefcase-metal-fill.svg';
import '@phosphor-icons/core/assets/regular/broadcast.svg';
import '@phosphor-icons/core/assets/fill/broadcast-fill.svg';
import '@phosphor-icons/core/assets/regular/broom.svg';
import '@phosphor-icons/core/assets/fill/broom-fill.svg';
import '@phosphor-icons/core/assets/regular/browser.svg';
import '@phosphor-icons/core/assets/fill/browser-fill.svg';
import '@phosphor-icons/core/assets/regular/browsers.svg';
import '@phosphor-icons/core/assets/fill/browsers-fill.svg';
import '@phosphor-icons/core/assets/regular/bug.svg';
import '@phosphor-icons/core/assets/fill/bug-fill.svg';
import '@phosphor-icons/core/assets/regular/bug-beetle.svg';
import '@phosphor-icons/core/assets/fill/bug-beetle-fill.svg';
import '@phosphor-icons/core/assets/regular/bug-droid.svg';
import '@phosphor-icons/core/assets/fill/bug-droid-fill.svg';
import '@phosphor-icons/core/assets/regular/buildings.svg';
import '@phosphor-icons/core/assets/fill/buildings-fill.svg';
import '@phosphor-icons/core/assets/regular/bus.svg';
import '@phosphor-icons/core/assets/fill/bus-fill.svg';
import '@phosphor-icons/core/assets/regular/butterfly.svg';
import '@phosphor-icons/core/assets/fill/butterfly-fill.svg';
import '@phosphor-icons/core/assets/regular/cactus.svg';
import '@phosphor-icons/core/assets/fill/cactus-fill.svg';
import '@phosphor-icons/core/assets/regular/cake.svg';
import '@phosphor-icons/core/assets/fill/cake-fill.svg';
import '@phosphor-icons/core/assets/regular/calculator.svg';
import '@phosphor-icons/core/assets/fill/calculator-fill.svg';
import '@phosphor-icons/core/assets/regular/calendar.svg';
import '@phosphor-icons/core/assets/fill/calendar-fill.svg';
import '@phosphor-icons/core/assets/regular/calendar-blank.svg';
import '@phosphor-icons/core/assets/fill/calendar-blank-fill.svg';
import '@phosphor-icons/core/assets/regular/calendar-check.svg';
import '@phosphor-icons/core/assets/fill/calendar-check-fill.svg';
import '@phosphor-icons/core/assets/regular/calendar-plus.svg';
import '@phosphor-icons/core/assets/fill/calendar-plus-fill.svg';
import '@phosphor-icons/core/assets/regular/calendar-x.svg';
import '@phosphor-icons/core/assets/fill/calendar-x-fill.svg';
import '@phosphor-icons/core/assets/regular/call-bell.svg';
import '@phosphor-icons/core/assets/fill/call-bell-fill.svg';
import '@phosphor-icons/core/assets/regular/camera.svg';
import '@phosphor-icons/core/assets/fill/camera-fill.svg';
import '@phosphor-icons/core/assets/regular/camera-plus.svg';
import '@phosphor-icons/core/assets/fill/camera-plus-fill.svg';
import '@phosphor-icons/core/assets/regular/camera-rotate.svg';
import '@phosphor-icons/core/assets/fill/camera-rotate-fill.svg';
import '@phosphor-icons/core/assets/regular/camera-slash.svg';
import '@phosphor-icons/core/assets/fill/camera-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/campfire.svg';
import '@phosphor-icons/core/assets/fill/campfire-fill.svg';
import '@phosphor-icons/core/assets/regular/car.svg';
import '@phosphor-icons/core/assets/fill/car-fill.svg';
import '@phosphor-icons/core/assets/regular/car-profile.svg';
import '@phosphor-icons/core/assets/fill/car-profile-fill.svg';
import '@phosphor-icons/core/assets/regular/car-simple.svg';
import '@phosphor-icons/core/assets/fill/car-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/cardholder.svg';
import '@phosphor-icons/core/assets/fill/cardholder-fill.svg';
import '@phosphor-icons/core/assets/regular/cards.svg';
import '@phosphor-icons/core/assets/fill/cards-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-circle-double-down.svg';
import '@phosphor-icons/core/assets/fill/caret-circle-double-down-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-circle-double-left.svg';
import '@phosphor-icons/core/assets/fill/caret-circle-double-left-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-circle-double-right.svg';
import '@phosphor-icons/core/assets/fill/caret-circle-double-right-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-circle-double-up.svg';
import '@phosphor-icons/core/assets/fill/caret-circle-double-up-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-circle-down.svg';
import '@phosphor-icons/core/assets/fill/caret-circle-down-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-circle-left.svg';
import '@phosphor-icons/core/assets/fill/caret-circle-left-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-circle-right.svg';
import '@phosphor-icons/core/assets/fill/caret-circle-right-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-circle-up.svg';
import '@phosphor-icons/core/assets/fill/caret-circle-up-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-circle-up-down.svg';
import '@phosphor-icons/core/assets/fill/caret-circle-up-down-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-double-down.svg';
import '@phosphor-icons/core/assets/fill/caret-double-down-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-double-left.svg';
import '@phosphor-icons/core/assets/fill/caret-double-left-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-double-right.svg';
import '@phosphor-icons/core/assets/fill/caret-double-right-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-double-up.svg';
import '@phosphor-icons/core/assets/fill/caret-double-up-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-down.svg';
import '@phosphor-icons/core/assets/fill/caret-down-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-left.svg';
import '@phosphor-icons/core/assets/fill/caret-left-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-right.svg';
import '@phosphor-icons/core/assets/fill/caret-right-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-up.svg';
import '@phosphor-icons/core/assets/fill/caret-up-fill.svg';
import '@phosphor-icons/core/assets/regular/caret-up-down.svg';
import '@phosphor-icons/core/assets/fill/caret-up-down-fill.svg';
import '@phosphor-icons/core/assets/regular/carrot.svg';
import '@phosphor-icons/core/assets/fill/carrot-fill.svg';
import '@phosphor-icons/core/assets/regular/cassette-tape.svg';
import '@phosphor-icons/core/assets/fill/cassette-tape-fill.svg';
import '@phosphor-icons/core/assets/regular/castle-turret.svg';
import '@phosphor-icons/core/assets/fill/castle-turret-fill.svg';
import '@phosphor-icons/core/assets/regular/cat.svg';
import '@phosphor-icons/core/assets/fill/cat-fill.svg';
import '@phosphor-icons/core/assets/regular/cell-signal-full.svg';
import '@phosphor-icons/core/assets/fill/cell-signal-full-fill.svg';
import '@phosphor-icons/core/assets/regular/cell-signal-high.svg';
import '@phosphor-icons/core/assets/fill/cell-signal-high-fill.svg';
import '@phosphor-icons/core/assets/regular/cell-signal-low.svg';
import '@phosphor-icons/core/assets/fill/cell-signal-low-fill.svg';
import '@phosphor-icons/core/assets/regular/cell-signal-medium.svg';
import '@phosphor-icons/core/assets/fill/cell-signal-medium-fill.svg';
import '@phosphor-icons/core/assets/regular/cell-signal-none.svg';
import '@phosphor-icons/core/assets/fill/cell-signal-none-fill.svg';
import '@phosphor-icons/core/assets/regular/cell-signal-slash.svg';
import '@phosphor-icons/core/assets/fill/cell-signal-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/cell-signal-x.svg';
import '@phosphor-icons/core/assets/fill/cell-signal-x-fill.svg';
import '@phosphor-icons/core/assets/regular/certificate.svg';
import '@phosphor-icons/core/assets/fill/certificate-fill.svg';
import '@phosphor-icons/core/assets/regular/chair.svg';
import '@phosphor-icons/core/assets/fill/chair-fill.svg';
import '@phosphor-icons/core/assets/regular/chalkboard.svg';
import '@phosphor-icons/core/assets/fill/chalkboard-fill.svg';
import '@phosphor-icons/core/assets/regular/chalkboard-simple.svg';
import '@phosphor-icons/core/assets/fill/chalkboard-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/chalkboard-teacher.svg';
import '@phosphor-icons/core/assets/fill/chalkboard-teacher-fill.svg';
import '@phosphor-icons/core/assets/regular/champagne.svg';
import '@phosphor-icons/core/assets/fill/champagne-fill.svg';
import '@phosphor-icons/core/assets/regular/charging-station.svg';
import '@phosphor-icons/core/assets/fill/charging-station-fill.svg';
import '@phosphor-icons/core/assets/regular/chart-bar.svg';
import '@phosphor-icons/core/assets/fill/chart-bar-fill.svg';
import '@phosphor-icons/core/assets/regular/chart-bar-horizontal.svg';
import '@phosphor-icons/core/assets/fill/chart-bar-horizontal-fill.svg';
import '@phosphor-icons/core/assets/regular/chart-donut.svg';
import '@phosphor-icons/core/assets/fill/chart-donut-fill.svg';
import '@phosphor-icons/core/assets/regular/chart-line.svg';
import '@phosphor-icons/core/assets/fill/chart-line-fill.svg';
import '@phosphor-icons/core/assets/regular/chart-line-down.svg';
import '@phosphor-icons/core/assets/fill/chart-line-down-fill.svg';
import '@phosphor-icons/core/assets/regular/chart-line-up.svg';
import '@phosphor-icons/core/assets/fill/chart-line-up-fill.svg';
import '@phosphor-icons/core/assets/regular/chart-pie.svg';
import '@phosphor-icons/core/assets/fill/chart-pie-fill.svg';
import '@phosphor-icons/core/assets/regular/chart-pie-slice.svg';
import '@phosphor-icons/core/assets/fill/chart-pie-slice-fill.svg';
import '@phosphor-icons/core/assets/regular/chart-polar.svg';
import '@phosphor-icons/core/assets/fill/chart-polar-fill.svg';
import '@phosphor-icons/core/assets/regular/chart-scatter.svg';
import '@phosphor-icons/core/assets/fill/chart-scatter-fill.svg';
import '@phosphor-icons/core/assets/regular/chat.svg';
import '@phosphor-icons/core/assets/fill/chat-fill.svg';
import '@phosphor-icons/core/assets/regular/chat-centered.svg';
import '@phosphor-icons/core/assets/fill/chat-centered-fill.svg';
import '@phosphor-icons/core/assets/regular/chat-centered-dots.svg';
import '@phosphor-icons/core/assets/fill/chat-centered-dots-fill.svg';
import '@phosphor-icons/core/assets/regular/chat-centered-text.svg';
import '@phosphor-icons/core/assets/fill/chat-centered-text-fill.svg';
import '@phosphor-icons/core/assets/regular/chat-circle.svg';
import '@phosphor-icons/core/assets/fill/chat-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/chat-circle-dots.svg';
import '@phosphor-icons/core/assets/fill/chat-circle-dots-fill.svg';
import '@phosphor-icons/core/assets/regular/chat-circle-text.svg';
import '@phosphor-icons/core/assets/fill/chat-circle-text-fill.svg';
import '@phosphor-icons/core/assets/regular/chat-dots.svg';
import '@phosphor-icons/core/assets/fill/chat-dots-fill.svg';
import '@phosphor-icons/core/assets/regular/chat-teardrop.svg';
import '@phosphor-icons/core/assets/fill/chat-teardrop-fill.svg';
import '@phosphor-icons/core/assets/regular/chat-teardrop-dots.svg';
import '@phosphor-icons/core/assets/fill/chat-teardrop-dots-fill.svg';
import '@phosphor-icons/core/assets/regular/chat-teardrop-text.svg';
import '@phosphor-icons/core/assets/fill/chat-teardrop-text-fill.svg';
import '@phosphor-icons/core/assets/regular/chat-text.svg';
import '@phosphor-icons/core/assets/fill/chat-text-fill.svg';
import '@phosphor-icons/core/assets/regular/chats.svg';
import '@phosphor-icons/core/assets/fill/chats-fill.svg';
import '@phosphor-icons/core/assets/regular/chats-circle.svg';
import '@phosphor-icons/core/assets/fill/chats-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/chats-teardrop.svg';
import '@phosphor-icons/core/assets/fill/chats-teardrop-fill.svg';
import { ReactComponent as ReactComponent$2 } from '@phosphor-icons/core/assets/regular/check.svg';
import '@phosphor-icons/core/assets/fill/check-fill.svg';
import '@phosphor-icons/core/assets/regular/check-circle.svg';
import '@phosphor-icons/core/assets/fill/check-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/check-fat.svg';
import '@phosphor-icons/core/assets/fill/check-fat-fill.svg';
import '@phosphor-icons/core/assets/regular/check-square.svg';
import '@phosphor-icons/core/assets/fill/check-square-fill.svg';
import '@phosphor-icons/core/assets/regular/check-square-offset.svg';
import '@phosphor-icons/core/assets/fill/check-square-offset-fill.svg';
import '@phosphor-icons/core/assets/regular/checks.svg';
import '@phosphor-icons/core/assets/fill/checks-fill.svg';
import '@phosphor-icons/core/assets/regular/church.svg';
import '@phosphor-icons/core/assets/fill/church-fill.svg';
import '@phosphor-icons/core/assets/regular/circle.svg';
import '@phosphor-icons/core/assets/fill/circle-fill.svg';
import '@phosphor-icons/core/assets/regular/circle-dashed.svg';
import '@phosphor-icons/core/assets/fill/circle-dashed-fill.svg';
import '@phosphor-icons/core/assets/regular/circle-half.svg';
import '@phosphor-icons/core/assets/fill/circle-half-fill.svg';
import '@phosphor-icons/core/assets/regular/circle-half-tilt.svg';
import '@phosphor-icons/core/assets/fill/circle-half-tilt-fill.svg';
import '@phosphor-icons/core/assets/regular/circle-notch.svg';
import '@phosphor-icons/core/assets/fill/circle-notch-fill.svg';
import '@phosphor-icons/core/assets/regular/circles-four.svg';
import '@phosphor-icons/core/assets/fill/circles-four-fill.svg';
import '@phosphor-icons/core/assets/regular/circles-three.svg';
import '@phosphor-icons/core/assets/fill/circles-three-fill.svg';
import '@phosphor-icons/core/assets/regular/circles-three-plus.svg';
import '@phosphor-icons/core/assets/fill/circles-three-plus-fill.svg';
import '@phosphor-icons/core/assets/regular/circuitry.svg';
import '@phosphor-icons/core/assets/fill/circuitry-fill.svg';
import '@phosphor-icons/core/assets/regular/clipboard.svg';
import '@phosphor-icons/core/assets/fill/clipboard-fill.svg';
import '@phosphor-icons/core/assets/regular/clipboard-text.svg';
import '@phosphor-icons/core/assets/fill/clipboard-text-fill.svg';
import '@phosphor-icons/core/assets/regular/clock.svg';
import '@phosphor-icons/core/assets/fill/clock-fill.svg';
import '@phosphor-icons/core/assets/regular/clock-afternoon.svg';
import '@phosphor-icons/core/assets/fill/clock-afternoon-fill.svg';
import '@phosphor-icons/core/assets/regular/clock-clockwise.svg';
import '@phosphor-icons/core/assets/fill/clock-clockwise-fill.svg';
import '@phosphor-icons/core/assets/regular/clock-countdown.svg';
import '@phosphor-icons/core/assets/fill/clock-countdown-fill.svg';
import '@phosphor-icons/core/assets/regular/clock-counter-clockwise.svg';
import '@phosphor-icons/core/assets/fill/clock-counter-clockwise-fill.svg';
import '@phosphor-icons/core/assets/regular/closed-captioning.svg';
import '@phosphor-icons/core/assets/fill/closed-captioning-fill.svg';
import '@phosphor-icons/core/assets/regular/cloud.svg';
import '@phosphor-icons/core/assets/fill/cloud-fill.svg';
import '@phosphor-icons/core/assets/regular/cloud-arrow-down.svg';
import '@phosphor-icons/core/assets/fill/cloud-arrow-down-fill.svg';
import '@phosphor-icons/core/assets/regular/cloud-arrow-up.svg';
import '@phosphor-icons/core/assets/fill/cloud-arrow-up-fill.svg';
import '@phosphor-icons/core/assets/regular/cloud-check.svg';
import '@phosphor-icons/core/assets/fill/cloud-check-fill.svg';
import '@phosphor-icons/core/assets/regular/cloud-fog.svg';
import '@phosphor-icons/core/assets/fill/cloud-fog-fill.svg';
import '@phosphor-icons/core/assets/regular/cloud-lightning.svg';
import '@phosphor-icons/core/assets/fill/cloud-lightning-fill.svg';
import '@phosphor-icons/core/assets/regular/cloud-moon.svg';
import '@phosphor-icons/core/assets/fill/cloud-moon-fill.svg';
import '@phosphor-icons/core/assets/regular/cloud-rain.svg';
import '@phosphor-icons/core/assets/fill/cloud-rain-fill.svg';
import '@phosphor-icons/core/assets/regular/cloud-slash.svg';
import '@phosphor-icons/core/assets/fill/cloud-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/cloud-snow.svg';
import '@phosphor-icons/core/assets/fill/cloud-snow-fill.svg';
import '@phosphor-icons/core/assets/regular/cloud-sun.svg';
import '@phosphor-icons/core/assets/fill/cloud-sun-fill.svg';
import '@phosphor-icons/core/assets/regular/cloud-warning.svg';
import '@phosphor-icons/core/assets/fill/cloud-warning-fill.svg';
import '@phosphor-icons/core/assets/regular/cloud-x.svg';
import '@phosphor-icons/core/assets/fill/cloud-x-fill.svg';
import '@phosphor-icons/core/assets/regular/club.svg';
import '@phosphor-icons/core/assets/fill/club-fill.svg';
import '@phosphor-icons/core/assets/regular/coat-hanger.svg';
import '@phosphor-icons/core/assets/fill/coat-hanger-fill.svg';
import '@phosphor-icons/core/assets/regular/coda-logo.svg';
import '@phosphor-icons/core/assets/fill/coda-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/code.svg';
import '@phosphor-icons/core/assets/fill/code-fill.svg';
import '@phosphor-icons/core/assets/regular/code-block.svg';
import '@phosphor-icons/core/assets/fill/code-block-fill.svg';
import '@phosphor-icons/core/assets/regular/code-simple.svg';
import '@phosphor-icons/core/assets/fill/code-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/codepen-logo.svg';
import '@phosphor-icons/core/assets/fill/codepen-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/codesandbox-logo.svg';
import '@phosphor-icons/core/assets/fill/codesandbox-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/coffee.svg';
import '@phosphor-icons/core/assets/fill/coffee-fill.svg';
import '@phosphor-icons/core/assets/regular/coin.svg';
import '@phosphor-icons/core/assets/fill/coin-fill.svg';
import '@phosphor-icons/core/assets/regular/coin-vertical.svg';
import '@phosphor-icons/core/assets/fill/coin-vertical-fill.svg';
import '@phosphor-icons/core/assets/regular/coins.svg';
import '@phosphor-icons/core/assets/fill/coins-fill.svg';
import '@phosphor-icons/core/assets/regular/columns.svg';
import '@phosphor-icons/core/assets/fill/columns-fill.svg';
import '@phosphor-icons/core/assets/regular/command.svg';
import '@phosphor-icons/core/assets/fill/command-fill.svg';
import '@phosphor-icons/core/assets/regular/compass.svg';
import '@phosphor-icons/core/assets/fill/compass-fill.svg';
import '@phosphor-icons/core/assets/regular/compass-tool.svg';
import '@phosphor-icons/core/assets/fill/compass-tool-fill.svg';
import '@phosphor-icons/core/assets/regular/computer-tower.svg';
import '@phosphor-icons/core/assets/fill/computer-tower-fill.svg';
import '@phosphor-icons/core/assets/regular/confetti.svg';
import '@phosphor-icons/core/assets/fill/confetti-fill.svg';
import '@phosphor-icons/core/assets/regular/contactless-payment.svg';
import '@phosphor-icons/core/assets/fill/contactless-payment-fill.svg';
import '@phosphor-icons/core/assets/regular/control.svg';
import '@phosphor-icons/core/assets/fill/control-fill.svg';
import '@phosphor-icons/core/assets/regular/cookie.svg';
import '@phosphor-icons/core/assets/fill/cookie-fill.svg';
import '@phosphor-icons/core/assets/regular/cooking-pot.svg';
import '@phosphor-icons/core/assets/fill/cooking-pot-fill.svg';
import '@phosphor-icons/core/assets/regular/copy.svg';
import '@phosphor-icons/core/assets/fill/copy-fill.svg';
import '@phosphor-icons/core/assets/regular/copy-simple.svg';
import '@phosphor-icons/core/assets/fill/copy-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/copyleft.svg';
import '@phosphor-icons/core/assets/fill/copyleft-fill.svg';
import '@phosphor-icons/core/assets/regular/copyright.svg';
import '@phosphor-icons/core/assets/fill/copyright-fill.svg';
import '@phosphor-icons/core/assets/regular/corners-in.svg';
import '@phosphor-icons/core/assets/fill/corners-in-fill.svg';
import '@phosphor-icons/core/assets/regular/corners-out.svg';
import '@phosphor-icons/core/assets/fill/corners-out-fill.svg';
import '@phosphor-icons/core/assets/regular/couch.svg';
import '@phosphor-icons/core/assets/fill/couch-fill.svg';
import '@phosphor-icons/core/assets/regular/cpu.svg';
import '@phosphor-icons/core/assets/fill/cpu-fill.svg';
import '@phosphor-icons/core/assets/regular/credit-card.svg';
import '@phosphor-icons/core/assets/fill/credit-card-fill.svg';
import '@phosphor-icons/core/assets/regular/crop.svg';
import '@phosphor-icons/core/assets/fill/crop-fill.svg';
import '@phosphor-icons/core/assets/regular/cross.svg';
import '@phosphor-icons/core/assets/fill/cross-fill.svg';
import '@phosphor-icons/core/assets/regular/crosshair.svg';
import '@phosphor-icons/core/assets/fill/crosshair-fill.svg';
import '@phosphor-icons/core/assets/regular/crosshair-simple.svg';
import '@phosphor-icons/core/assets/fill/crosshair-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/crown.svg';
import '@phosphor-icons/core/assets/fill/crown-fill.svg';
import '@phosphor-icons/core/assets/regular/crown-simple.svg';
import '@phosphor-icons/core/assets/fill/crown-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/cube.svg';
import '@phosphor-icons/core/assets/fill/cube-fill.svg';
import '@phosphor-icons/core/assets/regular/cube-focus.svg';
import '@phosphor-icons/core/assets/fill/cube-focus-fill.svg';
import '@phosphor-icons/core/assets/regular/cube-transparent.svg';
import '@phosphor-icons/core/assets/fill/cube-transparent-fill.svg';
import '@phosphor-icons/core/assets/regular/currency-btc.svg';
import '@phosphor-icons/core/assets/fill/currency-btc-fill.svg';
import '@phosphor-icons/core/assets/regular/currency-circle-dollar.svg';
import '@phosphor-icons/core/assets/fill/currency-circle-dollar-fill.svg';
import '@phosphor-icons/core/assets/regular/currency-cny.svg';
import '@phosphor-icons/core/assets/fill/currency-cny-fill.svg';
import '@phosphor-icons/core/assets/regular/currency-dollar.svg';
import '@phosphor-icons/core/assets/fill/currency-dollar-fill.svg';
import '@phosphor-icons/core/assets/regular/currency-dollar-simple.svg';
import '@phosphor-icons/core/assets/fill/currency-dollar-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/currency-eth.svg';
import '@phosphor-icons/core/assets/fill/currency-eth-fill.svg';
import '@phosphor-icons/core/assets/regular/currency-eur.svg';
import '@phosphor-icons/core/assets/fill/currency-eur-fill.svg';
import '@phosphor-icons/core/assets/regular/currency-gbp.svg';
import '@phosphor-icons/core/assets/fill/currency-gbp-fill.svg';
import '@phosphor-icons/core/assets/regular/currency-inr.svg';
import '@phosphor-icons/core/assets/fill/currency-inr-fill.svg';
import '@phosphor-icons/core/assets/regular/currency-jpy.svg';
import '@phosphor-icons/core/assets/fill/currency-jpy-fill.svg';
import '@phosphor-icons/core/assets/regular/currency-krw.svg';
import '@phosphor-icons/core/assets/fill/currency-krw-fill.svg';
import '@phosphor-icons/core/assets/regular/currency-kzt.svg';
import '@phosphor-icons/core/assets/fill/currency-kzt-fill.svg';
import '@phosphor-icons/core/assets/regular/currency-ngn.svg';
import '@phosphor-icons/core/assets/fill/currency-ngn-fill.svg';
import '@phosphor-icons/core/assets/regular/currency-rub.svg';
import '@phosphor-icons/core/assets/fill/currency-rub-fill.svg';
import '@phosphor-icons/core/assets/regular/cursor.svg';
import '@phosphor-icons/core/assets/fill/cursor-fill.svg';
import '@phosphor-icons/core/assets/regular/cursor-click.svg';
import '@phosphor-icons/core/assets/fill/cursor-click-fill.svg';
import '@phosphor-icons/core/assets/regular/cursor-text.svg';
import '@phosphor-icons/core/assets/fill/cursor-text-fill.svg';
import '@phosphor-icons/core/assets/regular/cylinder.svg';
import '@phosphor-icons/core/assets/fill/cylinder-fill.svg';
import '@phosphor-icons/core/assets/regular/database.svg';
import '@phosphor-icons/core/assets/fill/database-fill.svg';
import '@phosphor-icons/core/assets/regular/desktop.svg';
import '@phosphor-icons/core/assets/fill/desktop-fill.svg';
import '@phosphor-icons/core/assets/regular/desktop-tower.svg';
import '@phosphor-icons/core/assets/fill/desktop-tower-fill.svg';
import '@phosphor-icons/core/assets/regular/detective.svg';
import '@phosphor-icons/core/assets/fill/detective-fill.svg';
import '@phosphor-icons/core/assets/regular/dev-to-logo.svg';
import '@phosphor-icons/core/assets/fill/dev-to-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/device-mobile.svg';
import '@phosphor-icons/core/assets/fill/device-mobile-fill.svg';
import '@phosphor-icons/core/assets/regular/device-mobile-camera.svg';
import '@phosphor-icons/core/assets/fill/device-mobile-camera-fill.svg';
import '@phosphor-icons/core/assets/regular/device-mobile-speaker.svg';
import '@phosphor-icons/core/assets/fill/device-mobile-speaker-fill.svg';
import '@phosphor-icons/core/assets/regular/device-tablet.svg';
import '@phosphor-icons/core/assets/fill/device-tablet-fill.svg';
import '@phosphor-icons/core/assets/regular/device-tablet-camera.svg';
import '@phosphor-icons/core/assets/fill/device-tablet-camera-fill.svg';
import '@phosphor-icons/core/assets/regular/device-tablet-speaker.svg';
import '@phosphor-icons/core/assets/fill/device-tablet-speaker-fill.svg';
import '@phosphor-icons/core/assets/regular/devices.svg';
import '@phosphor-icons/core/assets/fill/devices-fill.svg';
import '@phosphor-icons/core/assets/regular/diamond.svg';
import '@phosphor-icons/core/assets/fill/diamond-fill.svg';
import '@phosphor-icons/core/assets/regular/diamonds-four.svg';
import '@phosphor-icons/core/assets/fill/diamonds-four-fill.svg';
import '@phosphor-icons/core/assets/regular/dice-five.svg';
import '@phosphor-icons/core/assets/fill/dice-five-fill.svg';
import '@phosphor-icons/core/assets/regular/dice-four.svg';
import '@phosphor-icons/core/assets/fill/dice-four-fill.svg';
import '@phosphor-icons/core/assets/regular/dice-one.svg';
import '@phosphor-icons/core/assets/fill/dice-one-fill.svg';
import '@phosphor-icons/core/assets/regular/dice-six.svg';
import '@phosphor-icons/core/assets/fill/dice-six-fill.svg';
import '@phosphor-icons/core/assets/regular/dice-three.svg';
import '@phosphor-icons/core/assets/fill/dice-three-fill.svg';
import '@phosphor-icons/core/assets/regular/dice-two.svg';
import '@phosphor-icons/core/assets/fill/dice-two-fill.svg';
import '@phosphor-icons/core/assets/regular/disc.svg';
import '@phosphor-icons/core/assets/fill/disc-fill.svg';
import '@phosphor-icons/core/assets/regular/discord-logo.svg';
import '@phosphor-icons/core/assets/fill/discord-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/divide.svg';
import '@phosphor-icons/core/assets/fill/divide-fill.svg';
import '@phosphor-icons/core/assets/regular/dna.svg';
import '@phosphor-icons/core/assets/fill/dna-fill.svg';
import '@phosphor-icons/core/assets/regular/dog.svg';
import '@phosphor-icons/core/assets/fill/dog-fill.svg';
import '@phosphor-icons/core/assets/regular/door.svg';
import '@phosphor-icons/core/assets/fill/door-fill.svg';
import '@phosphor-icons/core/assets/regular/door-open.svg';
import '@phosphor-icons/core/assets/fill/door-open-fill.svg';
import '@phosphor-icons/core/assets/regular/dot.svg';
import '@phosphor-icons/core/assets/fill/dot-fill.svg';
import '@phosphor-icons/core/assets/regular/dot-outline.svg';
import '@phosphor-icons/core/assets/fill/dot-outline-fill.svg';
import '@phosphor-icons/core/assets/regular/dots-nine.svg';
import '@phosphor-icons/core/assets/fill/dots-nine-fill.svg';
import '@phosphor-icons/core/assets/regular/dots-six.svg';
import '@phosphor-icons/core/assets/fill/dots-six-fill.svg';
import '@phosphor-icons/core/assets/regular/dots-six-vertical.svg';
import '@phosphor-icons/core/assets/fill/dots-six-vertical-fill.svg';
import '@phosphor-icons/core/assets/regular/dots-three.svg';
import '@phosphor-icons/core/assets/fill/dots-three-fill.svg';
import '@phosphor-icons/core/assets/regular/dots-three-circle.svg';
import '@phosphor-icons/core/assets/fill/dots-three-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/dots-three-circle-vertical.svg';
import '@phosphor-icons/core/assets/fill/dots-three-circle-vertical-fill.svg';
import '@phosphor-icons/core/assets/regular/dots-three-outline.svg';
import '@phosphor-icons/core/assets/fill/dots-three-outline-fill.svg';
import '@phosphor-icons/core/assets/regular/dots-three-outline-vertical.svg';
import '@phosphor-icons/core/assets/fill/dots-three-outline-vertical-fill.svg';
import '@phosphor-icons/core/assets/regular/dots-three-vertical.svg';
import '@phosphor-icons/core/assets/fill/dots-three-vertical-fill.svg';
import '@phosphor-icons/core/assets/regular/download.svg';
import '@phosphor-icons/core/assets/fill/download-fill.svg';
import '@phosphor-icons/core/assets/regular/download-simple.svg';
import '@phosphor-icons/core/assets/fill/download-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/dress.svg';
import '@phosphor-icons/core/assets/fill/dress-fill.svg';
import '@phosphor-icons/core/assets/regular/dribbble-logo.svg';
import '@phosphor-icons/core/assets/fill/dribbble-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/drop.svg';
import '@phosphor-icons/core/assets/fill/drop-fill.svg';
import '@phosphor-icons/core/assets/regular/drop-half.svg';
import '@phosphor-icons/core/assets/fill/drop-half-fill.svg';
import '@phosphor-icons/core/assets/regular/drop-half-bottom.svg';
import '@phosphor-icons/core/assets/fill/drop-half-bottom-fill.svg';
import '@phosphor-icons/core/assets/regular/dropbox-logo.svg';
import '@phosphor-icons/core/assets/fill/dropbox-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/ear.svg';
import '@phosphor-icons/core/assets/fill/ear-fill.svg';
import '@phosphor-icons/core/assets/regular/ear-slash.svg';
import '@phosphor-icons/core/assets/fill/ear-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/egg.svg';
import '@phosphor-icons/core/assets/fill/egg-fill.svg';
import '@phosphor-icons/core/assets/regular/egg-crack.svg';
import '@phosphor-icons/core/assets/fill/egg-crack-fill.svg';
import '@phosphor-icons/core/assets/regular/eject.svg';
import '@phosphor-icons/core/assets/fill/eject-fill.svg';
import '@phosphor-icons/core/assets/regular/eject-simple.svg';
import '@phosphor-icons/core/assets/fill/eject-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/elevator.svg';
import '@phosphor-icons/core/assets/fill/elevator-fill.svg';
import '@phosphor-icons/core/assets/regular/engine.svg';
import '@phosphor-icons/core/assets/fill/engine-fill.svg';
import '@phosphor-icons/core/assets/regular/envelope.svg';
import '@phosphor-icons/core/assets/fill/envelope-fill.svg';
import '@phosphor-icons/core/assets/regular/envelope-open.svg';
import '@phosphor-icons/core/assets/fill/envelope-open-fill.svg';
import '@phosphor-icons/core/assets/regular/envelope-simple.svg';
import '@phosphor-icons/core/assets/fill/envelope-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/envelope-simple-open.svg';
import '@phosphor-icons/core/assets/fill/envelope-simple-open-fill.svg';
import '@phosphor-icons/core/assets/regular/equalizer.svg';
import '@phosphor-icons/core/assets/fill/equalizer-fill.svg';
import '@phosphor-icons/core/assets/regular/equals.svg';
import '@phosphor-icons/core/assets/fill/equals-fill.svg';
import '@phosphor-icons/core/assets/regular/eraser.svg';
import '@phosphor-icons/core/assets/fill/eraser-fill.svg';
import '@phosphor-icons/core/assets/regular/escalator-down.svg';
import '@phosphor-icons/core/assets/fill/escalator-down-fill.svg';
import '@phosphor-icons/core/assets/regular/escalator-up.svg';
import '@phosphor-icons/core/assets/fill/escalator-up-fill.svg';
import '@phosphor-icons/core/assets/regular/exam.svg';
import '@phosphor-icons/core/assets/fill/exam-fill.svg';
import '@phosphor-icons/core/assets/regular/exclude.svg';
import '@phosphor-icons/core/assets/fill/exclude-fill.svg';
import '@phosphor-icons/core/assets/regular/exclude-square.svg';
import '@phosphor-icons/core/assets/fill/exclude-square-fill.svg';
import '@phosphor-icons/core/assets/regular/export.svg';
import '@phosphor-icons/core/assets/fill/export-fill.svg';
import '@phosphor-icons/core/assets/regular/eye.svg';
import '@phosphor-icons/core/assets/fill/eye-fill.svg';
import '@phosphor-icons/core/assets/regular/eye-closed.svg';
import '@phosphor-icons/core/assets/fill/eye-closed-fill.svg';
import '@phosphor-icons/core/assets/regular/eye-slash.svg';
import '@phosphor-icons/core/assets/fill/eye-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/eyedropper.svg';
import '@phosphor-icons/core/assets/fill/eyedropper-fill.svg';
import '@phosphor-icons/core/assets/regular/eyedropper-sample.svg';
import '@phosphor-icons/core/assets/fill/eyedropper-sample-fill.svg';
import '@phosphor-icons/core/assets/regular/eyeglasses.svg';
import '@phosphor-icons/core/assets/fill/eyeglasses-fill.svg';
import '@phosphor-icons/core/assets/regular/face-mask.svg';
import '@phosphor-icons/core/assets/fill/face-mask-fill.svg';
import '@phosphor-icons/core/assets/regular/facebook-logo.svg';
import '@phosphor-icons/core/assets/fill/facebook-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/factory.svg';
import '@phosphor-icons/core/assets/fill/factory-fill.svg';
import '@phosphor-icons/core/assets/regular/faders.svg';
import '@phosphor-icons/core/assets/fill/faders-fill.svg';
import '@phosphor-icons/core/assets/regular/faders-horizontal.svg';
import '@phosphor-icons/core/assets/fill/faders-horizontal-fill.svg';
import '@phosphor-icons/core/assets/regular/fan.svg';
import '@phosphor-icons/core/assets/fill/fan-fill.svg';
import '@phosphor-icons/core/assets/regular/fast-forward.svg';
import '@phosphor-icons/core/assets/fill/fast-forward-fill.svg';
import '@phosphor-icons/core/assets/regular/fast-forward-circle.svg';
import '@phosphor-icons/core/assets/fill/fast-forward-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/feather.svg';
import '@phosphor-icons/core/assets/fill/feather-fill.svg';
import '@phosphor-icons/core/assets/regular/figma-logo.svg';
import '@phosphor-icons/core/assets/fill/figma-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/file.svg';
import '@phosphor-icons/core/assets/fill/file-fill.svg';
import '@phosphor-icons/core/assets/regular/file-archive.svg';
import '@phosphor-icons/core/assets/fill/file-archive-fill.svg';
import '@phosphor-icons/core/assets/regular/file-arrow-down.svg';
import '@phosphor-icons/core/assets/fill/file-arrow-down-fill.svg';
import '@phosphor-icons/core/assets/regular/file-arrow-up.svg';
import '@phosphor-icons/core/assets/fill/file-arrow-up-fill.svg';
import '@phosphor-icons/core/assets/regular/file-audio.svg';
import '@phosphor-icons/core/assets/fill/file-audio-fill.svg';
import '@phosphor-icons/core/assets/regular/file-cloud.svg';
import '@phosphor-icons/core/assets/fill/file-cloud-fill.svg';
import '@phosphor-icons/core/assets/regular/file-code.svg';
import '@phosphor-icons/core/assets/fill/file-code-fill.svg';
import '@phosphor-icons/core/assets/regular/file-css.svg';
import '@phosphor-icons/core/assets/fill/file-css-fill.svg';
import '@phosphor-icons/core/assets/regular/file-csv.svg';
import '@phosphor-icons/core/assets/fill/file-csv-fill.svg';
import '@phosphor-icons/core/assets/regular/file-dashed.svg';
import '@phosphor-icons/core/assets/fill/file-dashed-fill.svg';
import '@phosphor-icons/core/assets/regular/file-doc.svg';
import '@phosphor-icons/core/assets/fill/file-doc-fill.svg';
import '@phosphor-icons/core/assets/regular/file-html.svg';
import '@phosphor-icons/core/assets/fill/file-html-fill.svg';
import '@phosphor-icons/core/assets/regular/file-image.svg';
import '@phosphor-icons/core/assets/fill/file-image-fill.svg';
import '@phosphor-icons/core/assets/regular/file-jpg.svg';
import '@phosphor-icons/core/assets/fill/file-jpg-fill.svg';
import '@phosphor-icons/core/assets/regular/file-js.svg';
import '@phosphor-icons/core/assets/fill/file-js-fill.svg';
import '@phosphor-icons/core/assets/regular/file-jsx.svg';
import '@phosphor-icons/core/assets/fill/file-jsx-fill.svg';
import '@phosphor-icons/core/assets/regular/file-lock.svg';
import '@phosphor-icons/core/assets/fill/file-lock-fill.svg';
import '@phosphor-icons/core/assets/regular/file-magnifying-glass.svg';
import '@phosphor-icons/core/assets/fill/file-magnifying-glass-fill.svg';
import '@phosphor-icons/core/assets/regular/file-minus.svg';
import '@phosphor-icons/core/assets/fill/file-minus-fill.svg';
import '@phosphor-icons/core/assets/regular/file-pdf.svg';
import '@phosphor-icons/core/assets/fill/file-pdf-fill.svg';
import '@phosphor-icons/core/assets/regular/file-plus.svg';
import '@phosphor-icons/core/assets/fill/file-plus-fill.svg';
import '@phosphor-icons/core/assets/regular/file-png.svg';
import '@phosphor-icons/core/assets/fill/file-png-fill.svg';
import '@phosphor-icons/core/assets/regular/file-ppt.svg';
import '@phosphor-icons/core/assets/fill/file-ppt-fill.svg';
import '@phosphor-icons/core/assets/regular/file-rs.svg';
import '@phosphor-icons/core/assets/fill/file-rs-fill.svg';
import '@phosphor-icons/core/assets/regular/file-sql.svg';
import '@phosphor-icons/core/assets/fill/file-sql-fill.svg';
import '@phosphor-icons/core/assets/regular/file-svg.svg';
import '@phosphor-icons/core/assets/fill/file-svg-fill.svg';
import '@phosphor-icons/core/assets/regular/file-text.svg';
import '@phosphor-icons/core/assets/fill/file-text-fill.svg';
import '@phosphor-icons/core/assets/regular/file-ts.svg';
import '@phosphor-icons/core/assets/fill/file-ts-fill.svg';
import '@phosphor-icons/core/assets/regular/file-tsx.svg';
import '@phosphor-icons/core/assets/fill/file-tsx-fill.svg';
import '@phosphor-icons/core/assets/regular/file-video.svg';
import '@phosphor-icons/core/assets/fill/file-video-fill.svg';
import '@phosphor-icons/core/assets/regular/file-vue.svg';
import '@phosphor-icons/core/assets/fill/file-vue-fill.svg';
import '@phosphor-icons/core/assets/regular/file-x.svg';
import '@phosphor-icons/core/assets/fill/file-x-fill.svg';
import '@phosphor-icons/core/assets/regular/file-xls.svg';
import '@phosphor-icons/core/assets/fill/file-xls-fill.svg';
import '@phosphor-icons/core/assets/regular/file-zip.svg';
import '@phosphor-icons/core/assets/fill/file-zip-fill.svg';
import '@phosphor-icons/core/assets/regular/files.svg';
import '@phosphor-icons/core/assets/fill/files-fill.svg';
import '@phosphor-icons/core/assets/regular/film-reel.svg';
import '@phosphor-icons/core/assets/fill/film-reel-fill.svg';
import '@phosphor-icons/core/assets/regular/film-script.svg';
import '@phosphor-icons/core/assets/fill/film-script-fill.svg';
import '@phosphor-icons/core/assets/regular/film-slate.svg';
import '@phosphor-icons/core/assets/fill/film-slate-fill.svg';
import '@phosphor-icons/core/assets/regular/film-strip.svg';
import '@phosphor-icons/core/assets/fill/film-strip-fill.svg';
import '@phosphor-icons/core/assets/regular/fingerprint.svg';
import '@phosphor-icons/core/assets/fill/fingerprint-fill.svg';
import '@phosphor-icons/core/assets/regular/fingerprint-simple.svg';
import '@phosphor-icons/core/assets/fill/fingerprint-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/finn-the-human.svg';
import '@phosphor-icons/core/assets/fill/finn-the-human-fill.svg';
import '@phosphor-icons/core/assets/regular/fire.svg';
import '@phosphor-icons/core/assets/fill/fire-fill.svg';
import '@phosphor-icons/core/assets/regular/fire-extinguisher.svg';
import '@phosphor-icons/core/assets/fill/fire-extinguisher-fill.svg';
import '@phosphor-icons/core/assets/regular/fire-simple.svg';
import '@phosphor-icons/core/assets/fill/fire-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/first-aid.svg';
import '@phosphor-icons/core/assets/fill/first-aid-fill.svg';
import '@phosphor-icons/core/assets/regular/first-aid-kit.svg';
import '@phosphor-icons/core/assets/fill/first-aid-kit-fill.svg';
import '@phosphor-icons/core/assets/regular/fish.svg';
import '@phosphor-icons/core/assets/fill/fish-fill.svg';
import '@phosphor-icons/core/assets/regular/fish-simple.svg';
import '@phosphor-icons/core/assets/fill/fish-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/flag.svg';
import '@phosphor-icons/core/assets/fill/flag-fill.svg';
import '@phosphor-icons/core/assets/regular/flag-banner.svg';
import '@phosphor-icons/core/assets/fill/flag-banner-fill.svg';
import '@phosphor-icons/core/assets/regular/flag-checkered.svg';
import '@phosphor-icons/core/assets/fill/flag-checkered-fill.svg';
import '@phosphor-icons/core/assets/regular/flag-pennant.svg';
import '@phosphor-icons/core/assets/fill/flag-pennant-fill.svg';
import '@phosphor-icons/core/assets/regular/flame.svg';
import '@phosphor-icons/core/assets/fill/flame-fill.svg';
import '@phosphor-icons/core/assets/regular/flashlight.svg';
import '@phosphor-icons/core/assets/fill/flashlight-fill.svg';
import '@phosphor-icons/core/assets/regular/flask.svg';
import '@phosphor-icons/core/assets/fill/flask-fill.svg';
import '@phosphor-icons/core/assets/regular/floppy-disk.svg';
import '@phosphor-icons/core/assets/fill/floppy-disk-fill.svg';
import '@phosphor-icons/core/assets/regular/floppy-disk-back.svg';
import '@phosphor-icons/core/assets/fill/floppy-disk-back-fill.svg';
import '@phosphor-icons/core/assets/regular/flow-arrow.svg';
import '@phosphor-icons/core/assets/fill/flow-arrow-fill.svg';
import '@phosphor-icons/core/assets/regular/flower.svg';
import '@phosphor-icons/core/assets/fill/flower-fill.svg';
import '@phosphor-icons/core/assets/regular/flower-lotus.svg';
import '@phosphor-icons/core/assets/fill/flower-lotus-fill.svg';
import '@phosphor-icons/core/assets/regular/flower-tulip.svg';
import '@phosphor-icons/core/assets/fill/flower-tulip-fill.svg';
import '@phosphor-icons/core/assets/regular/flying-saucer.svg';
import '@phosphor-icons/core/assets/fill/flying-saucer-fill.svg';
import '@phosphor-icons/core/assets/regular/folder.svg';
import '@phosphor-icons/core/assets/fill/folder-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-dashed.svg';
import '@phosphor-icons/core/assets/fill/folder-dashed-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-lock.svg';
import '@phosphor-icons/core/assets/fill/folder-lock-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-minus.svg';
import '@phosphor-icons/core/assets/fill/folder-minus-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-notch.svg';
import '@phosphor-icons/core/assets/fill/folder-notch-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-notch-minus.svg';
import '@phosphor-icons/core/assets/fill/folder-notch-minus-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-notch-open.svg';
import '@phosphor-icons/core/assets/fill/folder-notch-open-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-notch-plus.svg';
import '@phosphor-icons/core/assets/fill/folder-notch-plus-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-open.svg';
import '@phosphor-icons/core/assets/fill/folder-open-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-plus.svg';
import '@phosphor-icons/core/assets/fill/folder-plus-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-simple.svg';
import '@phosphor-icons/core/assets/fill/folder-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-simple-dashed.svg';
import '@phosphor-icons/core/assets/fill/folder-simple-dashed-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-simple-lock.svg';
import '@phosphor-icons/core/assets/fill/folder-simple-lock-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-simple-minus.svg';
import '@phosphor-icons/core/assets/fill/folder-simple-minus-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-simple-plus.svg';
import '@phosphor-icons/core/assets/fill/folder-simple-plus-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-simple-star.svg';
import '@phosphor-icons/core/assets/fill/folder-simple-star-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-simple-user.svg';
import '@phosphor-icons/core/assets/fill/folder-simple-user-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-star.svg';
import '@phosphor-icons/core/assets/fill/folder-star-fill.svg';
import '@phosphor-icons/core/assets/regular/folder-user.svg';
import '@phosphor-icons/core/assets/fill/folder-user-fill.svg';
import '@phosphor-icons/core/assets/regular/folders.svg';
import '@phosphor-icons/core/assets/fill/folders-fill.svg';
import '@phosphor-icons/core/assets/regular/football.svg';
import '@phosphor-icons/core/assets/fill/football-fill.svg';
import '@phosphor-icons/core/assets/regular/footprints.svg';
import '@phosphor-icons/core/assets/fill/footprints-fill.svg';
import '@phosphor-icons/core/assets/regular/fork-knife.svg';
import '@phosphor-icons/core/assets/fill/fork-knife-fill.svg';
import '@phosphor-icons/core/assets/regular/frame-corners.svg';
import '@phosphor-icons/core/assets/fill/frame-corners-fill.svg';
import '@phosphor-icons/core/assets/regular/framer-logo.svg';
import '@phosphor-icons/core/assets/fill/framer-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/function.svg';
import '@phosphor-icons/core/assets/fill/function-fill.svg';
import '@phosphor-icons/core/assets/regular/funnel.svg';
import '@phosphor-icons/core/assets/fill/funnel-fill.svg';
import '@phosphor-icons/core/assets/regular/funnel-simple.svg';
import '@phosphor-icons/core/assets/fill/funnel-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/game-controller.svg';
import '@phosphor-icons/core/assets/fill/game-controller-fill.svg';
import '@phosphor-icons/core/assets/regular/garage.svg';
import '@phosphor-icons/core/assets/fill/garage-fill.svg';
import '@phosphor-icons/core/assets/regular/gas-can.svg';
import '@phosphor-icons/core/assets/fill/gas-can-fill.svg';
import '@phosphor-icons/core/assets/regular/gas-pump.svg';
import '@phosphor-icons/core/assets/fill/gas-pump-fill.svg';
import '@phosphor-icons/core/assets/regular/gauge.svg';
import '@phosphor-icons/core/assets/fill/gauge-fill.svg';
import '@phosphor-icons/core/assets/regular/gavel.svg';
import '@phosphor-icons/core/assets/fill/gavel-fill.svg';
import '@phosphor-icons/core/assets/regular/gear.svg';
import '@phosphor-icons/core/assets/fill/gear-fill.svg';
import '@phosphor-icons/core/assets/regular/gear-fine.svg';
import '@phosphor-icons/core/assets/fill/gear-fine-fill.svg';
import '@phosphor-icons/core/assets/regular/gear-six.svg';
import '@phosphor-icons/core/assets/fill/gear-six-fill.svg';
import '@phosphor-icons/core/assets/regular/gender-female.svg';
import '@phosphor-icons/core/assets/fill/gender-female-fill.svg';
import '@phosphor-icons/core/assets/regular/gender-intersex.svg';
import '@phosphor-icons/core/assets/fill/gender-intersex-fill.svg';
import '@phosphor-icons/core/assets/regular/gender-male.svg';
import '@phosphor-icons/core/assets/fill/gender-male-fill.svg';
import '@phosphor-icons/core/assets/regular/gender-neuter.svg';
import '@phosphor-icons/core/assets/fill/gender-neuter-fill.svg';
import '@phosphor-icons/core/assets/regular/gender-nonbinary.svg';
import '@phosphor-icons/core/assets/fill/gender-nonbinary-fill.svg';
import '@phosphor-icons/core/assets/regular/gender-transgender.svg';
import '@phosphor-icons/core/assets/fill/gender-transgender-fill.svg';
import '@phosphor-icons/core/assets/regular/ghost.svg';
import '@phosphor-icons/core/assets/fill/ghost-fill.svg';
import '@phosphor-icons/core/assets/regular/gif.svg';
import '@phosphor-icons/core/assets/fill/gif-fill.svg';
import '@phosphor-icons/core/assets/regular/gift.svg';
import '@phosphor-icons/core/assets/fill/gift-fill.svg';
import '@phosphor-icons/core/assets/regular/git-branch.svg';
import '@phosphor-icons/core/assets/fill/git-branch-fill.svg';
import '@phosphor-icons/core/assets/regular/git-commit.svg';
import '@phosphor-icons/core/assets/fill/git-commit-fill.svg';
import '@phosphor-icons/core/assets/regular/git-diff.svg';
import '@phosphor-icons/core/assets/fill/git-diff-fill.svg';
import '@phosphor-icons/core/assets/regular/git-fork.svg';
import '@phosphor-icons/core/assets/fill/git-fork-fill.svg';
import '@phosphor-icons/core/assets/regular/git-merge.svg';
import '@phosphor-icons/core/assets/fill/git-merge-fill.svg';
import '@phosphor-icons/core/assets/regular/git-pull-request.svg';
import '@phosphor-icons/core/assets/fill/git-pull-request-fill.svg';
import '@phosphor-icons/core/assets/regular/github-logo.svg';
import '@phosphor-icons/core/assets/fill/github-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/gitlab-logo.svg';
import '@phosphor-icons/core/assets/fill/gitlab-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/gitlab-logo-simple.svg';
import '@phosphor-icons/core/assets/fill/gitlab-logo-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/globe.svg';
import '@phosphor-icons/core/assets/fill/globe-fill.svg';
import '@phosphor-icons/core/assets/regular/globe-hemisphere-east.svg';
import '@phosphor-icons/core/assets/fill/globe-hemisphere-east-fill.svg';
import '@phosphor-icons/core/assets/regular/globe-hemisphere-west.svg';
import '@phosphor-icons/core/assets/fill/globe-hemisphere-west-fill.svg';
import '@phosphor-icons/core/assets/regular/globe-simple.svg';
import '@phosphor-icons/core/assets/fill/globe-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/globe-stand.svg';
import '@phosphor-icons/core/assets/fill/globe-stand-fill.svg';
import '@phosphor-icons/core/assets/regular/goggles.svg';
import '@phosphor-icons/core/assets/fill/goggles-fill.svg';
import '@phosphor-icons/core/assets/regular/goodreads-logo.svg';
import '@phosphor-icons/core/assets/fill/goodreads-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/google-cardboard-logo.svg';
import '@phosphor-icons/core/assets/fill/google-cardboard-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/google-chrome-logo.svg';
import '@phosphor-icons/core/assets/fill/google-chrome-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/google-drive-logo.svg';
import '@phosphor-icons/core/assets/fill/google-drive-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/google-logo.svg';
import '@phosphor-icons/core/assets/fill/google-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/google-photos-logo.svg';
import '@phosphor-icons/core/assets/fill/google-photos-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/google-play-logo.svg';
import '@phosphor-icons/core/assets/fill/google-play-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/google-podcasts-logo.svg';
import '@phosphor-icons/core/assets/fill/google-podcasts-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/gradient.svg';
import '@phosphor-icons/core/assets/fill/gradient-fill.svg';
import '@phosphor-icons/core/assets/regular/graduation-cap.svg';
import '@phosphor-icons/core/assets/fill/graduation-cap-fill.svg';
import '@phosphor-icons/core/assets/regular/grains.svg';
import '@phosphor-icons/core/assets/fill/grains-fill.svg';
import '@phosphor-icons/core/assets/regular/grains-slash.svg';
import '@phosphor-icons/core/assets/fill/grains-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/graph.svg';
import '@phosphor-icons/core/assets/fill/graph-fill.svg';
import '@phosphor-icons/core/assets/regular/grid-four.svg';
import '@phosphor-icons/core/assets/fill/grid-four-fill.svg';
import '@phosphor-icons/core/assets/regular/grid-nine.svg';
import '@phosphor-icons/core/assets/fill/grid-nine-fill.svg';
import '@phosphor-icons/core/assets/regular/guitar.svg';
import '@phosphor-icons/core/assets/fill/guitar-fill.svg';
import '@phosphor-icons/core/assets/regular/hamburger.svg';
import '@phosphor-icons/core/assets/fill/hamburger-fill.svg';
import '@phosphor-icons/core/assets/regular/hammer.svg';
import '@phosphor-icons/core/assets/fill/hammer-fill.svg';
import '@phosphor-icons/core/assets/regular/hand.svg';
import '@phosphor-icons/core/assets/fill/hand-fill.svg';
import '@phosphor-icons/core/assets/regular/hand-coins.svg';
import '@phosphor-icons/core/assets/fill/hand-coins-fill.svg';
import '@phosphor-icons/core/assets/regular/hand-eye.svg';
import '@phosphor-icons/core/assets/fill/hand-eye-fill.svg';
import '@phosphor-icons/core/assets/regular/hand-fist.svg';
import '@phosphor-icons/core/assets/fill/hand-fist-fill.svg';
import '@phosphor-icons/core/assets/regular/hand-grabbing.svg';
import '@phosphor-icons/core/assets/fill/hand-grabbing-fill.svg';
import '@phosphor-icons/core/assets/regular/hand-heart.svg';
import '@phosphor-icons/core/assets/fill/hand-heart-fill.svg';
import '@phosphor-icons/core/assets/regular/hand-palm.svg';
import '@phosphor-icons/core/assets/fill/hand-palm-fill.svg';
import '@phosphor-icons/core/assets/regular/hand-pointing.svg';
import '@phosphor-icons/core/assets/fill/hand-pointing-fill.svg';
import '@phosphor-icons/core/assets/regular/hand-soap.svg';
import '@phosphor-icons/core/assets/fill/hand-soap-fill.svg';
import '@phosphor-icons/core/assets/regular/hand-swipe-left.svg';
import '@phosphor-icons/core/assets/fill/hand-swipe-left-fill.svg';
import '@phosphor-icons/core/assets/regular/hand-swipe-right.svg';
import '@phosphor-icons/core/assets/fill/hand-swipe-right-fill.svg';
import '@phosphor-icons/core/assets/regular/hand-tap.svg';
import '@phosphor-icons/core/assets/fill/hand-tap-fill.svg';
import '@phosphor-icons/core/assets/regular/hand-waving.svg';
import '@phosphor-icons/core/assets/fill/hand-waving-fill.svg';
import '@phosphor-icons/core/assets/regular/handbag.svg';
import '@phosphor-icons/core/assets/fill/handbag-fill.svg';
import '@phosphor-icons/core/assets/regular/handbag-simple.svg';
import '@phosphor-icons/core/assets/fill/handbag-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/hands-clapping.svg';
import '@phosphor-icons/core/assets/fill/hands-clapping-fill.svg';
import '@phosphor-icons/core/assets/regular/hands-praying.svg';
import '@phosphor-icons/core/assets/fill/hands-praying-fill.svg';
import '@phosphor-icons/core/assets/regular/handshake.svg';
import '@phosphor-icons/core/assets/fill/handshake-fill.svg';
import '@phosphor-icons/core/assets/regular/hard-drive.svg';
import '@phosphor-icons/core/assets/fill/hard-drive-fill.svg';
import '@phosphor-icons/core/assets/regular/hard-drives.svg';
import '@phosphor-icons/core/assets/fill/hard-drives-fill.svg';
import '@phosphor-icons/core/assets/regular/hash.svg';
import '@phosphor-icons/core/assets/fill/hash-fill.svg';
import '@phosphor-icons/core/assets/regular/hash-straight.svg';
import '@phosphor-icons/core/assets/fill/hash-straight-fill.svg';
import '@phosphor-icons/core/assets/regular/headlights.svg';
import '@phosphor-icons/core/assets/fill/headlights-fill.svg';
import '@phosphor-icons/core/assets/regular/headphones.svg';
import '@phosphor-icons/core/assets/fill/headphones-fill.svg';
import '@phosphor-icons/core/assets/regular/headset.svg';
import '@phosphor-icons/core/assets/fill/headset-fill.svg';
import '@phosphor-icons/core/assets/regular/heart.svg';
import '@phosphor-icons/core/assets/fill/heart-fill.svg';
import '@phosphor-icons/core/assets/regular/heart-break.svg';
import '@phosphor-icons/core/assets/fill/heart-break-fill.svg';
import '@phosphor-icons/core/assets/regular/heart-half.svg';
import '@phosphor-icons/core/assets/fill/heart-half-fill.svg';
import '@phosphor-icons/core/assets/regular/heart-straight.svg';
import '@phosphor-icons/core/assets/fill/heart-straight-fill.svg';
import '@phosphor-icons/core/assets/regular/heart-straight-break.svg';
import '@phosphor-icons/core/assets/fill/heart-straight-break-fill.svg';
import '@phosphor-icons/core/assets/regular/heartbeat.svg';
import '@phosphor-icons/core/assets/fill/heartbeat-fill.svg';
import '@phosphor-icons/core/assets/regular/hexagon.svg';
import '@phosphor-icons/core/assets/fill/hexagon-fill.svg';
import '@phosphor-icons/core/assets/regular/high-heel.svg';
import '@phosphor-icons/core/assets/fill/high-heel-fill.svg';
import '@phosphor-icons/core/assets/regular/highlighter-circle.svg';
import '@phosphor-icons/core/assets/fill/highlighter-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/hoodie.svg';
import '@phosphor-icons/core/assets/fill/hoodie-fill.svg';
import '@phosphor-icons/core/assets/regular/horse.svg';
import '@phosphor-icons/core/assets/fill/horse-fill.svg';
import '@phosphor-icons/core/assets/regular/hourglass.svg';
import '@phosphor-icons/core/assets/fill/hourglass-fill.svg';
import '@phosphor-icons/core/assets/regular/hourglass-high.svg';
import '@phosphor-icons/core/assets/fill/hourglass-high-fill.svg';
import '@phosphor-icons/core/assets/regular/hourglass-low.svg';
import '@phosphor-icons/core/assets/fill/hourglass-low-fill.svg';
import '@phosphor-icons/core/assets/regular/hourglass-medium.svg';
import '@phosphor-icons/core/assets/fill/hourglass-medium-fill.svg';
import '@phosphor-icons/core/assets/regular/hourglass-simple.svg';
import '@phosphor-icons/core/assets/fill/hourglass-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/hourglass-simple-high.svg';
import '@phosphor-icons/core/assets/fill/hourglass-simple-high-fill.svg';
import '@phosphor-icons/core/assets/regular/hourglass-simple-low.svg';
import '@phosphor-icons/core/assets/fill/hourglass-simple-low-fill.svg';
import '@phosphor-icons/core/assets/regular/hourglass-simple-medium.svg';
import '@phosphor-icons/core/assets/fill/hourglass-simple-medium-fill.svg';
import '@phosphor-icons/core/assets/regular/house.svg';
import '@phosphor-icons/core/assets/fill/house-fill.svg';
import '@phosphor-icons/core/assets/regular/house-line.svg';
import '@phosphor-icons/core/assets/fill/house-line-fill.svg';
import '@phosphor-icons/core/assets/regular/house-simple.svg';
import '@phosphor-icons/core/assets/fill/house-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/ice-cream.svg';
import '@phosphor-icons/core/assets/fill/ice-cream-fill.svg';
import '@phosphor-icons/core/assets/regular/identification-badge.svg';
import '@phosphor-icons/core/assets/fill/identification-badge-fill.svg';
import '@phosphor-icons/core/assets/regular/identification-card.svg';
import '@phosphor-icons/core/assets/fill/identification-card-fill.svg';
import '@phosphor-icons/core/assets/regular/image.svg';
import '@phosphor-icons/core/assets/fill/image-fill.svg';
import '@phosphor-icons/core/assets/regular/image-square.svg';
import '@phosphor-icons/core/assets/fill/image-square-fill.svg';
import '@phosphor-icons/core/assets/regular/images.svg';
import '@phosphor-icons/core/assets/fill/images-fill.svg';
import '@phosphor-icons/core/assets/regular/images-square.svg';
import '@phosphor-icons/core/assets/fill/images-square-fill.svg';
import '@phosphor-icons/core/assets/regular/infinity.svg';
import '@phosphor-icons/core/assets/fill/infinity-fill.svg';
import { ReactComponent } from '@phosphor-icons/core/assets/regular/info.svg';
import '@phosphor-icons/core/assets/fill/info-fill.svg';
import '@phosphor-icons/core/assets/regular/instagram-logo.svg';
import '@phosphor-icons/core/assets/fill/instagram-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/intersect.svg';
import '@phosphor-icons/core/assets/fill/intersect-fill.svg';
import '@phosphor-icons/core/assets/regular/intersect-square.svg';
import '@phosphor-icons/core/assets/fill/intersect-square-fill.svg';
import '@phosphor-icons/core/assets/regular/intersect-three.svg';
import '@phosphor-icons/core/assets/fill/intersect-three-fill.svg';
import '@phosphor-icons/core/assets/regular/jeep.svg';
import '@phosphor-icons/core/assets/fill/jeep-fill.svg';
import '@phosphor-icons/core/assets/regular/kanban.svg';
import '@phosphor-icons/core/assets/fill/kanban-fill.svg';
import '@phosphor-icons/core/assets/regular/key.svg';
import '@phosphor-icons/core/assets/fill/key-fill.svg';
import '@phosphor-icons/core/assets/regular/key-return.svg';
import '@phosphor-icons/core/assets/fill/key-return-fill.svg';
import '@phosphor-icons/core/assets/regular/keyboard.svg';
import '@phosphor-icons/core/assets/fill/keyboard-fill.svg';
import '@phosphor-icons/core/assets/regular/keyhole.svg';
import '@phosphor-icons/core/assets/fill/keyhole-fill.svg';
import '@phosphor-icons/core/assets/regular/knife.svg';
import '@phosphor-icons/core/assets/fill/knife-fill.svg';
import '@phosphor-icons/core/assets/regular/ladder.svg';
import '@phosphor-icons/core/assets/fill/ladder-fill.svg';
import '@phosphor-icons/core/assets/regular/ladder-simple.svg';
import '@phosphor-icons/core/assets/fill/ladder-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/lamp.svg';
import '@phosphor-icons/core/assets/fill/lamp-fill.svg';
import '@phosphor-icons/core/assets/regular/laptop.svg';
import '@phosphor-icons/core/assets/fill/laptop-fill.svg';
import '@phosphor-icons/core/assets/regular/layout.svg';
import '@phosphor-icons/core/assets/fill/layout-fill.svg';
import '@phosphor-icons/core/assets/regular/leaf.svg';
import '@phosphor-icons/core/assets/fill/leaf-fill.svg';
import '@phosphor-icons/core/assets/regular/lifebuoy.svg';
import '@phosphor-icons/core/assets/fill/lifebuoy-fill.svg';
import '@phosphor-icons/core/assets/regular/lightbulb.svg';
import '@phosphor-icons/core/assets/fill/lightbulb-fill.svg';
import '@phosphor-icons/core/assets/regular/lightbulb-filament.svg';
import '@phosphor-icons/core/assets/fill/lightbulb-filament-fill.svg';
import '@phosphor-icons/core/assets/regular/lighthouse.svg';
import '@phosphor-icons/core/assets/fill/lighthouse-fill.svg';
import '@phosphor-icons/core/assets/regular/lightning.svg';
import '@phosphor-icons/core/assets/fill/lightning-fill.svg';
import '@phosphor-icons/core/assets/regular/lightning-a.svg';
import '@phosphor-icons/core/assets/fill/lightning-a-fill.svg';
import '@phosphor-icons/core/assets/regular/lightning-slash.svg';
import '@phosphor-icons/core/assets/fill/lightning-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/line-segment.svg';
import '@phosphor-icons/core/assets/fill/line-segment-fill.svg';
import '@phosphor-icons/core/assets/regular/line-segments.svg';
import '@phosphor-icons/core/assets/fill/line-segments-fill.svg';
import '@phosphor-icons/core/assets/regular/link.svg';
import '@phosphor-icons/core/assets/fill/link-fill.svg';
import '@phosphor-icons/core/assets/regular/link-break.svg';
import '@phosphor-icons/core/assets/fill/link-break-fill.svg';
import '@phosphor-icons/core/assets/regular/link-simple.svg';
import '@phosphor-icons/core/assets/fill/link-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/link-simple-break.svg';
import '@phosphor-icons/core/assets/fill/link-simple-break-fill.svg';
import '@phosphor-icons/core/assets/regular/link-simple-horizontal.svg';
import '@phosphor-icons/core/assets/fill/link-simple-horizontal-fill.svg';
import '@phosphor-icons/core/assets/regular/link-simple-horizontal-break.svg';
import '@phosphor-icons/core/assets/fill/link-simple-horizontal-break-fill.svg';
import '@phosphor-icons/core/assets/regular/linkedin-logo.svg';
import '@phosphor-icons/core/assets/fill/linkedin-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/linux-logo.svg';
import '@phosphor-icons/core/assets/fill/linux-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/list.svg';
import '@phosphor-icons/core/assets/fill/list-fill.svg';
import '@phosphor-icons/core/assets/regular/list-bullets.svg';
import '@phosphor-icons/core/assets/fill/list-bullets-fill.svg';
import '@phosphor-icons/core/assets/regular/list-checks.svg';
import '@phosphor-icons/core/assets/fill/list-checks-fill.svg';
import '@phosphor-icons/core/assets/regular/list-dashes.svg';
import '@phosphor-icons/core/assets/fill/list-dashes-fill.svg';
import '@phosphor-icons/core/assets/regular/list-magnifying-glass.svg';
import '@phosphor-icons/core/assets/fill/list-magnifying-glass-fill.svg';
import '@phosphor-icons/core/assets/regular/list-numbers.svg';
import '@phosphor-icons/core/assets/fill/list-numbers-fill.svg';
import '@phosphor-icons/core/assets/regular/list-plus.svg';
import '@phosphor-icons/core/assets/fill/list-plus-fill.svg';
import '@phosphor-icons/core/assets/regular/lock.svg';
import '@phosphor-icons/core/assets/fill/lock-fill.svg';
import '@phosphor-icons/core/assets/regular/lock-key.svg';
import '@phosphor-icons/core/assets/fill/lock-key-fill.svg';
import '@phosphor-icons/core/assets/regular/lock-key-open.svg';
import '@phosphor-icons/core/assets/fill/lock-key-open-fill.svg';
import '@phosphor-icons/core/assets/regular/lock-laminated.svg';
import '@phosphor-icons/core/assets/fill/lock-laminated-fill.svg';
import '@phosphor-icons/core/assets/regular/lock-laminated-open.svg';
import '@phosphor-icons/core/assets/fill/lock-laminated-open-fill.svg';
import '@phosphor-icons/core/assets/regular/lock-open.svg';
import '@phosphor-icons/core/assets/fill/lock-open-fill.svg';
import '@phosphor-icons/core/assets/regular/lock-simple.svg';
import '@phosphor-icons/core/assets/fill/lock-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/lock-simple-open.svg';
import '@phosphor-icons/core/assets/fill/lock-simple-open-fill.svg';
import '@phosphor-icons/core/assets/regular/lockers.svg';
import '@phosphor-icons/core/assets/fill/lockers-fill.svg';
import '@phosphor-icons/core/assets/regular/magic-wand.svg';
import '@phosphor-icons/core/assets/fill/magic-wand-fill.svg';
import '@phosphor-icons/core/assets/regular/magnet.svg';
import '@phosphor-icons/core/assets/fill/magnet-fill.svg';
import '@phosphor-icons/core/assets/regular/magnet-straight.svg';
import '@phosphor-icons/core/assets/fill/magnet-straight-fill.svg';
import '@phosphor-icons/core/assets/regular/magnifying-glass.svg';
import '@phosphor-icons/core/assets/fill/magnifying-glass-fill.svg';
import '@phosphor-icons/core/assets/regular/magnifying-glass-minus.svg';
import '@phosphor-icons/core/assets/fill/magnifying-glass-minus-fill.svg';
import '@phosphor-icons/core/assets/regular/magnifying-glass-plus.svg';
import '@phosphor-icons/core/assets/fill/magnifying-glass-plus-fill.svg';
import '@phosphor-icons/core/assets/regular/map-pin.svg';
import '@phosphor-icons/core/assets/fill/map-pin-fill.svg';
import '@phosphor-icons/core/assets/regular/map-pin-line.svg';
import '@phosphor-icons/core/assets/fill/map-pin-line-fill.svg';
import '@phosphor-icons/core/assets/regular/map-trifold.svg';
import '@phosphor-icons/core/assets/fill/map-trifold-fill.svg';
import '@phosphor-icons/core/assets/regular/marker-circle.svg';
import '@phosphor-icons/core/assets/fill/marker-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/martini.svg';
import '@phosphor-icons/core/assets/fill/martini-fill.svg';
import '@phosphor-icons/core/assets/regular/mask-happy.svg';
import '@phosphor-icons/core/assets/fill/mask-happy-fill.svg';
import '@phosphor-icons/core/assets/regular/mask-sad.svg';
import '@phosphor-icons/core/assets/fill/mask-sad-fill.svg';
import '@phosphor-icons/core/assets/regular/math-operations.svg';
import '@phosphor-icons/core/assets/fill/math-operations-fill.svg';
import '@phosphor-icons/core/assets/regular/medal.svg';
import '@phosphor-icons/core/assets/fill/medal-fill.svg';
import '@phosphor-icons/core/assets/regular/medal-military.svg';
import '@phosphor-icons/core/assets/fill/medal-military-fill.svg';
import '@phosphor-icons/core/assets/regular/medium-logo.svg';
import '@phosphor-icons/core/assets/fill/medium-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/megaphone.svg';
import '@phosphor-icons/core/assets/fill/megaphone-fill.svg';
import '@phosphor-icons/core/assets/regular/megaphone-simple.svg';
import '@phosphor-icons/core/assets/fill/megaphone-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/messenger-logo.svg';
import '@phosphor-icons/core/assets/fill/messenger-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/meta-logo.svg';
import '@phosphor-icons/core/assets/fill/meta-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/metronome.svg';
import '@phosphor-icons/core/assets/fill/metronome-fill.svg';
import '@phosphor-icons/core/assets/regular/microphone.svg';
import '@phosphor-icons/core/assets/fill/microphone-fill.svg';
import '@phosphor-icons/core/assets/regular/microphone-slash.svg';
import '@phosphor-icons/core/assets/fill/microphone-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/microphone-stage.svg';
import '@phosphor-icons/core/assets/fill/microphone-stage-fill.svg';
import '@phosphor-icons/core/assets/regular/microsoft-excel-logo.svg';
import '@phosphor-icons/core/assets/fill/microsoft-excel-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/microsoft-outlook-logo.svg';
import '@phosphor-icons/core/assets/fill/microsoft-outlook-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/microsoft-powerpoint-logo.svg';
import '@phosphor-icons/core/assets/fill/microsoft-powerpoint-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/microsoft-teams-logo.svg';
import '@phosphor-icons/core/assets/fill/microsoft-teams-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/microsoft-word-logo.svg';
import '@phosphor-icons/core/assets/fill/microsoft-word-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/minus.svg';
import '@phosphor-icons/core/assets/fill/minus-fill.svg';
import '@phosphor-icons/core/assets/regular/minus-circle.svg';
import '@phosphor-icons/core/assets/fill/minus-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/minus-square.svg';
import '@phosphor-icons/core/assets/fill/minus-square-fill.svg';
import '@phosphor-icons/core/assets/regular/money.svg';
import '@phosphor-icons/core/assets/fill/money-fill.svg';
import '@phosphor-icons/core/assets/regular/monitor.svg';
import '@phosphor-icons/core/assets/fill/monitor-fill.svg';
import '@phosphor-icons/core/assets/regular/monitor-play.svg';
import '@phosphor-icons/core/assets/fill/monitor-play-fill.svg';
import '@phosphor-icons/core/assets/regular/moon.svg';
import '@phosphor-icons/core/assets/fill/moon-fill.svg';
import '@phosphor-icons/core/assets/regular/moon-stars.svg';
import '@phosphor-icons/core/assets/fill/moon-stars-fill.svg';
import '@phosphor-icons/core/assets/regular/moped.svg';
import '@phosphor-icons/core/assets/fill/moped-fill.svg';
import '@phosphor-icons/core/assets/regular/moped-front.svg';
import '@phosphor-icons/core/assets/fill/moped-front-fill.svg';
import '@phosphor-icons/core/assets/regular/mosque.svg';
import '@phosphor-icons/core/assets/fill/mosque-fill.svg';
import '@phosphor-icons/core/assets/regular/motorcycle.svg';
import '@phosphor-icons/core/assets/fill/motorcycle-fill.svg';
import '@phosphor-icons/core/assets/regular/mountains.svg';
import '@phosphor-icons/core/assets/fill/mountains-fill.svg';
import '@phosphor-icons/core/assets/regular/mouse.svg';
import '@phosphor-icons/core/assets/fill/mouse-fill.svg';
import '@phosphor-icons/core/assets/regular/mouse-simple.svg';
import '@phosphor-icons/core/assets/fill/mouse-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/music-note.svg';
import '@phosphor-icons/core/assets/fill/music-note-fill.svg';
import '@phosphor-icons/core/assets/regular/music-note-simple.svg';
import '@phosphor-icons/core/assets/fill/music-note-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/music-notes.svg';
import '@phosphor-icons/core/assets/fill/music-notes-fill.svg';
import '@phosphor-icons/core/assets/regular/music-notes-plus.svg';
import '@phosphor-icons/core/assets/fill/music-notes-plus-fill.svg';
import '@phosphor-icons/core/assets/regular/music-notes-simple.svg';
import '@phosphor-icons/core/assets/fill/music-notes-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/navigation-arrow.svg';
import '@phosphor-icons/core/assets/fill/navigation-arrow-fill.svg';
import '@phosphor-icons/core/assets/regular/needle.svg';
import '@phosphor-icons/core/assets/fill/needle-fill.svg';
import '@phosphor-icons/core/assets/regular/newspaper.svg';
import '@phosphor-icons/core/assets/fill/newspaper-fill.svg';
import '@phosphor-icons/core/assets/regular/newspaper-clipping.svg';
import '@phosphor-icons/core/assets/fill/newspaper-clipping-fill.svg';
import '@phosphor-icons/core/assets/regular/notches.svg';
import '@phosphor-icons/core/assets/fill/notches-fill.svg';
import '@phosphor-icons/core/assets/regular/note.svg';
import '@phosphor-icons/core/assets/fill/note-fill.svg';
import '@phosphor-icons/core/assets/regular/note-blank.svg';
import '@phosphor-icons/core/assets/fill/note-blank-fill.svg';
import '@phosphor-icons/core/assets/regular/note-pencil.svg';
import '@phosphor-icons/core/assets/fill/note-pencil-fill.svg';
import '@phosphor-icons/core/assets/regular/notebook.svg';
import '@phosphor-icons/core/assets/fill/notebook-fill.svg';
import '@phosphor-icons/core/assets/regular/notepad.svg';
import '@phosphor-icons/core/assets/fill/notepad-fill.svg';
import '@phosphor-icons/core/assets/regular/notification.svg';
import '@phosphor-icons/core/assets/fill/notification-fill.svg';
import '@phosphor-icons/core/assets/regular/notion-logo.svg';
import '@phosphor-icons/core/assets/fill/notion-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/number-circle-eight.svg';
import '@phosphor-icons/core/assets/fill/number-circle-eight-fill.svg';
import '@phosphor-icons/core/assets/regular/number-circle-five.svg';
import '@phosphor-icons/core/assets/fill/number-circle-five-fill.svg';
import '@phosphor-icons/core/assets/regular/number-circle-four.svg';
import '@phosphor-icons/core/assets/fill/number-circle-four-fill.svg';
import '@phosphor-icons/core/assets/regular/number-circle-nine.svg';
import '@phosphor-icons/core/assets/fill/number-circle-nine-fill.svg';
import '@phosphor-icons/core/assets/regular/number-circle-one.svg';
import '@phosphor-icons/core/assets/fill/number-circle-one-fill.svg';
import '@phosphor-icons/core/assets/regular/number-circle-seven.svg';
import '@phosphor-icons/core/assets/fill/number-circle-seven-fill.svg';
import '@phosphor-icons/core/assets/regular/number-circle-six.svg';
import '@phosphor-icons/core/assets/fill/number-circle-six-fill.svg';
import '@phosphor-icons/core/assets/regular/number-circle-three.svg';
import '@phosphor-icons/core/assets/fill/number-circle-three-fill.svg';
import '@phosphor-icons/core/assets/regular/number-circle-two.svg';
import '@phosphor-icons/core/assets/fill/number-circle-two-fill.svg';
import '@phosphor-icons/core/assets/regular/number-circle-zero.svg';
import '@phosphor-icons/core/assets/fill/number-circle-zero-fill.svg';
import '@phosphor-icons/core/assets/regular/number-eight.svg';
import '@phosphor-icons/core/assets/fill/number-eight-fill.svg';
import '@phosphor-icons/core/assets/regular/number-five.svg';
import '@phosphor-icons/core/assets/fill/number-five-fill.svg';
import '@phosphor-icons/core/assets/regular/number-four.svg';
import '@phosphor-icons/core/assets/fill/number-four-fill.svg';
import '@phosphor-icons/core/assets/regular/number-nine.svg';
import '@phosphor-icons/core/assets/fill/number-nine-fill.svg';
import '@phosphor-icons/core/assets/regular/number-one.svg';
import '@phosphor-icons/core/assets/fill/number-one-fill.svg';
import '@phosphor-icons/core/assets/regular/number-seven.svg';
import '@phosphor-icons/core/assets/fill/number-seven-fill.svg';
import '@phosphor-icons/core/assets/regular/number-six.svg';
import '@phosphor-icons/core/assets/fill/number-six-fill.svg';
import '@phosphor-icons/core/assets/regular/number-square-eight.svg';
import '@phosphor-icons/core/assets/fill/number-square-eight-fill.svg';
import '@phosphor-icons/core/assets/regular/number-square-five.svg';
import '@phosphor-icons/core/assets/fill/number-square-five-fill.svg';
import '@phosphor-icons/core/assets/regular/number-square-four.svg';
import '@phosphor-icons/core/assets/fill/number-square-four-fill.svg';
import '@phosphor-icons/core/assets/regular/number-square-nine.svg';
import '@phosphor-icons/core/assets/fill/number-square-nine-fill.svg';
import '@phosphor-icons/core/assets/regular/number-square-one.svg';
import '@phosphor-icons/core/assets/fill/number-square-one-fill.svg';
import '@phosphor-icons/core/assets/regular/number-square-seven.svg';
import '@phosphor-icons/core/assets/fill/number-square-seven-fill.svg';
import '@phosphor-icons/core/assets/regular/number-square-six.svg';
import '@phosphor-icons/core/assets/fill/number-square-six-fill.svg';
import '@phosphor-icons/core/assets/regular/number-square-three.svg';
import '@phosphor-icons/core/assets/fill/number-square-three-fill.svg';
import '@phosphor-icons/core/assets/regular/number-square-two.svg';
import '@phosphor-icons/core/assets/fill/number-square-two-fill.svg';
import '@phosphor-icons/core/assets/regular/number-square-zero.svg';
import '@phosphor-icons/core/assets/fill/number-square-zero-fill.svg';
import '@phosphor-icons/core/assets/regular/number-three.svg';
import '@phosphor-icons/core/assets/fill/number-three-fill.svg';
import '@phosphor-icons/core/assets/regular/number-two.svg';
import '@phosphor-icons/core/assets/fill/number-two-fill.svg';
import '@phosphor-icons/core/assets/regular/number-zero.svg';
import '@phosphor-icons/core/assets/fill/number-zero-fill.svg';
import '@phosphor-icons/core/assets/regular/nut.svg';
import '@phosphor-icons/core/assets/fill/nut-fill.svg';
import '@phosphor-icons/core/assets/regular/ny-times-logo.svg';
import '@phosphor-icons/core/assets/fill/ny-times-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/octagon.svg';
import '@phosphor-icons/core/assets/fill/octagon-fill.svg';
import '@phosphor-icons/core/assets/regular/office-chair.svg';
import '@phosphor-icons/core/assets/fill/office-chair-fill.svg';
import '@phosphor-icons/core/assets/regular/option.svg';
import '@phosphor-icons/core/assets/fill/option-fill.svg';
import '@phosphor-icons/core/assets/regular/orange-slice.svg';
import '@phosphor-icons/core/assets/fill/orange-slice-fill.svg';
import '@phosphor-icons/core/assets/regular/package.svg';
import '@phosphor-icons/core/assets/fill/package-fill.svg';
import '@phosphor-icons/core/assets/regular/paint-brush.svg';
import '@phosphor-icons/core/assets/fill/paint-brush-fill.svg';
import '@phosphor-icons/core/assets/regular/paint-brush-broad.svg';
import '@phosphor-icons/core/assets/fill/paint-brush-broad-fill.svg';
import '@phosphor-icons/core/assets/regular/paint-brush-household.svg';
import '@phosphor-icons/core/assets/fill/paint-brush-household-fill.svg';
import '@phosphor-icons/core/assets/regular/paint-bucket.svg';
import '@phosphor-icons/core/assets/fill/paint-bucket-fill.svg';
import '@phosphor-icons/core/assets/regular/paint-roller.svg';
import '@phosphor-icons/core/assets/fill/paint-roller-fill.svg';
import '@phosphor-icons/core/assets/regular/palette.svg';
import '@phosphor-icons/core/assets/fill/palette-fill.svg';
import '@phosphor-icons/core/assets/regular/pants.svg';
import '@phosphor-icons/core/assets/fill/pants-fill.svg';
import '@phosphor-icons/core/assets/regular/paper-plane.svg';
import '@phosphor-icons/core/assets/fill/paper-plane-fill.svg';
import '@phosphor-icons/core/assets/regular/paper-plane-right.svg';
import '@phosphor-icons/core/assets/fill/paper-plane-right-fill.svg';
import '@phosphor-icons/core/assets/regular/paper-plane-tilt.svg';
import '@phosphor-icons/core/assets/fill/paper-plane-tilt-fill.svg';
import '@phosphor-icons/core/assets/regular/paperclip.svg';
import '@phosphor-icons/core/assets/fill/paperclip-fill.svg';
import '@phosphor-icons/core/assets/regular/paperclip-horizontal.svg';
import '@phosphor-icons/core/assets/fill/paperclip-horizontal-fill.svg';
import '@phosphor-icons/core/assets/regular/parachute.svg';
import '@phosphor-icons/core/assets/fill/parachute-fill.svg';
import '@phosphor-icons/core/assets/regular/paragraph.svg';
import '@phosphor-icons/core/assets/fill/paragraph-fill.svg';
import '@phosphor-icons/core/assets/regular/parallelogram.svg';
import '@phosphor-icons/core/assets/fill/parallelogram-fill.svg';
import '@phosphor-icons/core/assets/regular/park.svg';
import '@phosphor-icons/core/assets/fill/park-fill.svg';
import '@phosphor-icons/core/assets/regular/password.svg';
import '@phosphor-icons/core/assets/fill/password-fill.svg';
import '@phosphor-icons/core/assets/regular/path.svg';
import '@phosphor-icons/core/assets/fill/path-fill.svg';
import '@phosphor-icons/core/assets/regular/patreon-logo.svg';
import '@phosphor-icons/core/assets/fill/patreon-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/pause.svg';
import '@phosphor-icons/core/assets/fill/pause-fill.svg';
import '@phosphor-icons/core/assets/regular/pause-circle.svg';
import '@phosphor-icons/core/assets/fill/pause-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/paw-print.svg';
import '@phosphor-icons/core/assets/fill/paw-print-fill.svg';
import '@phosphor-icons/core/assets/regular/paypal-logo.svg';
import '@phosphor-icons/core/assets/fill/paypal-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/peace.svg';
import '@phosphor-icons/core/assets/fill/peace-fill.svg';
import '@phosphor-icons/core/assets/regular/pen.svg';
import '@phosphor-icons/core/assets/fill/pen-fill.svg';
import '@phosphor-icons/core/assets/regular/pen-nib.svg';
import '@phosphor-icons/core/assets/fill/pen-nib-fill.svg';
import '@phosphor-icons/core/assets/regular/pen-nib-straight.svg';
import '@phosphor-icons/core/assets/fill/pen-nib-straight-fill.svg';
import '@phosphor-icons/core/assets/regular/pencil.svg';
import '@phosphor-icons/core/assets/fill/pencil-fill.svg';
import '@phosphor-icons/core/assets/regular/pencil-circle.svg';
import '@phosphor-icons/core/assets/fill/pencil-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/pencil-line.svg';
import '@phosphor-icons/core/assets/fill/pencil-line-fill.svg';
import '@phosphor-icons/core/assets/regular/pencil-simple.svg';
import '@phosphor-icons/core/assets/fill/pencil-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/pencil-simple-line.svg';
import '@phosphor-icons/core/assets/fill/pencil-simple-line-fill.svg';
import '@phosphor-icons/core/assets/regular/pencil-simple-slash.svg';
import '@phosphor-icons/core/assets/fill/pencil-simple-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/pencil-slash.svg';
import '@phosphor-icons/core/assets/fill/pencil-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/pentagram.svg';
import '@phosphor-icons/core/assets/fill/pentagram-fill.svg';
import '@phosphor-icons/core/assets/regular/pepper.svg';
import '@phosphor-icons/core/assets/fill/pepper-fill.svg';
import '@phosphor-icons/core/assets/regular/percent.svg';
import '@phosphor-icons/core/assets/fill/percent-fill.svg';
import '@phosphor-icons/core/assets/regular/person.svg';
import '@phosphor-icons/core/assets/fill/person-fill.svg';
import '@phosphor-icons/core/assets/regular/person-arms-spread.svg';
import '@phosphor-icons/core/assets/fill/person-arms-spread-fill.svg';
import '@phosphor-icons/core/assets/regular/person-simple.svg';
import '@phosphor-icons/core/assets/fill/person-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/person-simple-bike.svg';
import '@phosphor-icons/core/assets/fill/person-simple-bike-fill.svg';
import '@phosphor-icons/core/assets/regular/person-simple-run.svg';
import '@phosphor-icons/core/assets/fill/person-simple-run-fill.svg';
import '@phosphor-icons/core/assets/regular/person-simple-throw.svg';
import '@phosphor-icons/core/assets/fill/person-simple-throw-fill.svg';
import '@phosphor-icons/core/assets/regular/person-simple-walk.svg';
import '@phosphor-icons/core/assets/fill/person-simple-walk-fill.svg';
import '@phosphor-icons/core/assets/regular/perspective.svg';
import '@phosphor-icons/core/assets/fill/perspective-fill.svg';
import '@phosphor-icons/core/assets/regular/phone.svg';
import '@phosphor-icons/core/assets/fill/phone-fill.svg';
import '@phosphor-icons/core/assets/regular/phone-call.svg';
import '@phosphor-icons/core/assets/fill/phone-call-fill.svg';
import '@phosphor-icons/core/assets/regular/phone-disconnect.svg';
import '@phosphor-icons/core/assets/fill/phone-disconnect-fill.svg';
import '@phosphor-icons/core/assets/regular/phone-incoming.svg';
import '@phosphor-icons/core/assets/fill/phone-incoming-fill.svg';
import '@phosphor-icons/core/assets/regular/phone-outgoing.svg';
import '@phosphor-icons/core/assets/fill/phone-outgoing-fill.svg';
import '@phosphor-icons/core/assets/regular/phone-plus.svg';
import '@phosphor-icons/core/assets/fill/phone-plus-fill.svg';
import '@phosphor-icons/core/assets/regular/phone-slash.svg';
import '@phosphor-icons/core/assets/fill/phone-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/phone-x.svg';
import '@phosphor-icons/core/assets/fill/phone-x-fill.svg';
import '@phosphor-icons/core/assets/regular/phosphor-logo.svg';
import '@phosphor-icons/core/assets/fill/phosphor-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/pi.svg';
import '@phosphor-icons/core/assets/fill/pi-fill.svg';
import '@phosphor-icons/core/assets/regular/piano-keys.svg';
import '@phosphor-icons/core/assets/fill/piano-keys-fill.svg';
import '@phosphor-icons/core/assets/regular/picture-in-picture.svg';
import '@phosphor-icons/core/assets/fill/picture-in-picture-fill.svg';
import '@phosphor-icons/core/assets/regular/piggy-bank.svg';
import '@phosphor-icons/core/assets/fill/piggy-bank-fill.svg';
import '@phosphor-icons/core/assets/regular/pill.svg';
import '@phosphor-icons/core/assets/fill/pill-fill.svg';
import '@phosphor-icons/core/assets/regular/pinterest-logo.svg';
import '@phosphor-icons/core/assets/fill/pinterest-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/pinwheel.svg';
import '@phosphor-icons/core/assets/fill/pinwheel-fill.svg';
import '@phosphor-icons/core/assets/regular/pizza.svg';
import '@phosphor-icons/core/assets/fill/pizza-fill.svg';
import '@phosphor-icons/core/assets/regular/placeholder.svg';
import '@phosphor-icons/core/assets/fill/placeholder-fill.svg';
import '@phosphor-icons/core/assets/regular/planet.svg';
import '@phosphor-icons/core/assets/fill/planet-fill.svg';
import '@phosphor-icons/core/assets/regular/plant.svg';
import '@phosphor-icons/core/assets/fill/plant-fill.svg';
import '@phosphor-icons/core/assets/regular/play.svg';
import '@phosphor-icons/core/assets/fill/play-fill.svg';
import '@phosphor-icons/core/assets/regular/play-circle.svg';
import '@phosphor-icons/core/assets/fill/play-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/play-pause.svg';
import '@phosphor-icons/core/assets/fill/play-pause-fill.svg';
import '@phosphor-icons/core/assets/regular/playlist.svg';
import '@phosphor-icons/core/assets/fill/playlist-fill.svg';
import '@phosphor-icons/core/assets/regular/plug.svg';
import '@phosphor-icons/core/assets/fill/plug-fill.svg';
import '@phosphor-icons/core/assets/regular/plug-charging.svg';
import '@phosphor-icons/core/assets/fill/plug-charging-fill.svg';
import '@phosphor-icons/core/assets/regular/plugs.svg';
import '@phosphor-icons/core/assets/fill/plugs-fill.svg';
import '@phosphor-icons/core/assets/regular/plugs-connected.svg';
import '@phosphor-icons/core/assets/fill/plugs-connected-fill.svg';
import '@phosphor-icons/core/assets/regular/plus.svg';
import '@phosphor-icons/core/assets/fill/plus-fill.svg';
import '@phosphor-icons/core/assets/regular/plus-circle.svg';
import '@phosphor-icons/core/assets/fill/plus-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/plus-minus.svg';
import '@phosphor-icons/core/assets/fill/plus-minus-fill.svg';
import '@phosphor-icons/core/assets/regular/plus-square.svg';
import '@phosphor-icons/core/assets/fill/plus-square-fill.svg';
import '@phosphor-icons/core/assets/regular/poker-chip.svg';
import '@phosphor-icons/core/assets/fill/poker-chip-fill.svg';
import '@phosphor-icons/core/assets/regular/police-car.svg';
import '@phosphor-icons/core/assets/fill/police-car-fill.svg';
import '@phosphor-icons/core/assets/regular/polygon.svg';
import '@phosphor-icons/core/assets/fill/polygon-fill.svg';
import '@phosphor-icons/core/assets/regular/popcorn.svg';
import '@phosphor-icons/core/assets/fill/popcorn-fill.svg';
import '@phosphor-icons/core/assets/regular/potted-plant.svg';
import '@phosphor-icons/core/assets/fill/potted-plant-fill.svg';
import '@phosphor-icons/core/assets/regular/power.svg';
import '@phosphor-icons/core/assets/fill/power-fill.svg';
import '@phosphor-icons/core/assets/regular/prescription.svg';
import '@phosphor-icons/core/assets/fill/prescription-fill.svg';
import '@phosphor-icons/core/assets/regular/presentation.svg';
import '@phosphor-icons/core/assets/fill/presentation-fill.svg';
import '@phosphor-icons/core/assets/regular/presentation-chart.svg';
import '@phosphor-icons/core/assets/fill/presentation-chart-fill.svg';
import '@phosphor-icons/core/assets/regular/printer.svg';
import '@phosphor-icons/core/assets/fill/printer-fill.svg';
import '@phosphor-icons/core/assets/regular/prohibit.svg';
import '@phosphor-icons/core/assets/fill/prohibit-fill.svg';
import '@phosphor-icons/core/assets/regular/prohibit-inset.svg';
import '@phosphor-icons/core/assets/fill/prohibit-inset-fill.svg';
import '@phosphor-icons/core/assets/regular/projector-screen.svg';
import '@phosphor-icons/core/assets/fill/projector-screen-fill.svg';
import '@phosphor-icons/core/assets/regular/projector-screen-chart.svg';
import '@phosphor-icons/core/assets/fill/projector-screen-chart-fill.svg';
import '@phosphor-icons/core/assets/regular/pulse.svg';
import '@phosphor-icons/core/assets/fill/pulse-fill.svg';
import '@phosphor-icons/core/assets/regular/push-pin.svg';
import '@phosphor-icons/core/assets/fill/push-pin-fill.svg';
import '@phosphor-icons/core/assets/regular/push-pin-simple.svg';
import '@phosphor-icons/core/assets/fill/push-pin-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/push-pin-simple-slash.svg';
import '@phosphor-icons/core/assets/fill/push-pin-simple-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/push-pin-slash.svg';
import '@phosphor-icons/core/assets/fill/push-pin-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/puzzle-piece.svg';
import '@phosphor-icons/core/assets/fill/puzzle-piece-fill.svg';
import '@phosphor-icons/core/assets/regular/qr-code.svg';
import '@phosphor-icons/core/assets/fill/qr-code-fill.svg';
import '@phosphor-icons/core/assets/regular/question.svg';
import '@phosphor-icons/core/assets/fill/question-fill.svg';
import '@phosphor-icons/core/assets/regular/queue.svg';
import '@phosphor-icons/core/assets/fill/queue-fill.svg';
import '@phosphor-icons/core/assets/regular/quotes.svg';
import '@phosphor-icons/core/assets/fill/quotes-fill.svg';
import '@phosphor-icons/core/assets/regular/radical.svg';
import '@phosphor-icons/core/assets/fill/radical-fill.svg';
import '@phosphor-icons/core/assets/regular/radio.svg';
import '@phosphor-icons/core/assets/fill/radio-fill.svg';
import '@phosphor-icons/core/assets/regular/radio-button.svg';
import '@phosphor-icons/core/assets/fill/radio-button-fill.svg';
import '@phosphor-icons/core/assets/regular/radioactive.svg';
import '@phosphor-icons/core/assets/fill/radioactive-fill.svg';
import '@phosphor-icons/core/assets/regular/rainbow.svg';
import '@phosphor-icons/core/assets/fill/rainbow-fill.svg';
import '@phosphor-icons/core/assets/regular/rainbow-cloud.svg';
import '@phosphor-icons/core/assets/fill/rainbow-cloud-fill.svg';
import '@phosphor-icons/core/assets/regular/read-cv-logo.svg';
import '@phosphor-icons/core/assets/fill/read-cv-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/receipt.svg';
import '@phosphor-icons/core/assets/fill/receipt-fill.svg';
import '@phosphor-icons/core/assets/regular/receipt-x.svg';
import '@phosphor-icons/core/assets/fill/receipt-x-fill.svg';
import '@phosphor-icons/core/assets/regular/record.svg';
import '@phosphor-icons/core/assets/fill/record-fill.svg';
import '@phosphor-icons/core/assets/regular/rectangle.svg';
import '@phosphor-icons/core/assets/fill/rectangle-fill.svg';
import '@phosphor-icons/core/assets/regular/recycle.svg';
import '@phosphor-icons/core/assets/fill/recycle-fill.svg';
import '@phosphor-icons/core/assets/regular/reddit-logo.svg';
import '@phosphor-icons/core/assets/fill/reddit-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/repeat.svg';
import '@phosphor-icons/core/assets/fill/repeat-fill.svg';
import '@phosphor-icons/core/assets/regular/repeat-once.svg';
import '@phosphor-icons/core/assets/fill/repeat-once-fill.svg';
import '@phosphor-icons/core/assets/regular/rewind.svg';
import '@phosphor-icons/core/assets/fill/rewind-fill.svg';
import '@phosphor-icons/core/assets/regular/rewind-circle.svg';
import '@phosphor-icons/core/assets/fill/rewind-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/road-horizon.svg';
import '@phosphor-icons/core/assets/fill/road-horizon-fill.svg';
import '@phosphor-icons/core/assets/regular/robot.svg';
import '@phosphor-icons/core/assets/fill/robot-fill.svg';
import '@phosphor-icons/core/assets/regular/rocket.svg';
import '@phosphor-icons/core/assets/fill/rocket-fill.svg';
import '@phosphor-icons/core/assets/regular/rocket-launch.svg';
import '@phosphor-icons/core/assets/fill/rocket-launch-fill.svg';
import '@phosphor-icons/core/assets/regular/rows.svg';
import '@phosphor-icons/core/assets/fill/rows-fill.svg';
import '@phosphor-icons/core/assets/regular/rss.svg';
import '@phosphor-icons/core/assets/fill/rss-fill.svg';
import '@phosphor-icons/core/assets/regular/rss-simple.svg';
import '@phosphor-icons/core/assets/fill/rss-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/rug.svg';
import '@phosphor-icons/core/assets/fill/rug-fill.svg';
import '@phosphor-icons/core/assets/regular/ruler.svg';
import '@phosphor-icons/core/assets/fill/ruler-fill.svg';
import '@phosphor-icons/core/assets/regular/scales.svg';
import '@phosphor-icons/core/assets/fill/scales-fill.svg';
import '@phosphor-icons/core/assets/regular/scan.svg';
import '@phosphor-icons/core/assets/fill/scan-fill.svg';
import '@phosphor-icons/core/assets/regular/scissors.svg';
import '@phosphor-icons/core/assets/fill/scissors-fill.svg';
import '@phosphor-icons/core/assets/regular/scooter.svg';
import '@phosphor-icons/core/assets/fill/scooter-fill.svg';
import '@phosphor-icons/core/assets/regular/screencast.svg';
import '@phosphor-icons/core/assets/fill/screencast-fill.svg';
import '@phosphor-icons/core/assets/regular/scribble-loop.svg';
import '@phosphor-icons/core/assets/fill/scribble-loop-fill.svg';
import '@phosphor-icons/core/assets/regular/scroll.svg';
import '@phosphor-icons/core/assets/fill/scroll-fill.svg';
import '@phosphor-icons/core/assets/regular/seal.svg';
import '@phosphor-icons/core/assets/fill/seal-fill.svg';
import '@phosphor-icons/core/assets/regular/seal-check.svg';
import '@phosphor-icons/core/assets/fill/seal-check-fill.svg';
import '@phosphor-icons/core/assets/regular/seal-question.svg';
import '@phosphor-icons/core/assets/fill/seal-question-fill.svg';
import '@phosphor-icons/core/assets/regular/seal-warning.svg';
import '@phosphor-icons/core/assets/fill/seal-warning-fill.svg';
import '@phosphor-icons/core/assets/regular/selection.svg';
import '@phosphor-icons/core/assets/fill/selection-fill.svg';
import '@phosphor-icons/core/assets/regular/selection-all.svg';
import '@phosphor-icons/core/assets/fill/selection-all-fill.svg';
import '@phosphor-icons/core/assets/regular/selection-background.svg';
import '@phosphor-icons/core/assets/fill/selection-background-fill.svg';
import '@phosphor-icons/core/assets/regular/selection-foreground.svg';
import '@phosphor-icons/core/assets/fill/selection-foreground-fill.svg';
import '@phosphor-icons/core/assets/regular/selection-inverse.svg';
import '@phosphor-icons/core/assets/fill/selection-inverse-fill.svg';
import '@phosphor-icons/core/assets/regular/selection-plus.svg';
import '@phosphor-icons/core/assets/fill/selection-plus-fill.svg';
import '@phosphor-icons/core/assets/regular/selection-slash.svg';
import '@phosphor-icons/core/assets/fill/selection-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/shapes.svg';
import '@phosphor-icons/core/assets/fill/shapes-fill.svg';
import '@phosphor-icons/core/assets/regular/share.svg';
import '@phosphor-icons/core/assets/fill/share-fill.svg';
import '@phosphor-icons/core/assets/regular/share-fat.svg';
import '@phosphor-icons/core/assets/fill/share-fat-fill.svg';
import '@phosphor-icons/core/assets/regular/share-network.svg';
import '@phosphor-icons/core/assets/fill/share-network-fill.svg';
import '@phosphor-icons/core/assets/regular/shield.svg';
import '@phosphor-icons/core/assets/fill/shield-fill.svg';
import '@phosphor-icons/core/assets/regular/shield-check.svg';
import '@phosphor-icons/core/assets/fill/shield-check-fill.svg';
import '@phosphor-icons/core/assets/regular/shield-checkered.svg';
import '@phosphor-icons/core/assets/fill/shield-checkered-fill.svg';
import '@phosphor-icons/core/assets/regular/shield-chevron.svg';
import '@phosphor-icons/core/assets/fill/shield-chevron-fill.svg';
import '@phosphor-icons/core/assets/regular/shield-plus.svg';
import '@phosphor-icons/core/assets/fill/shield-plus-fill.svg';
import '@phosphor-icons/core/assets/regular/shield-slash.svg';
import '@phosphor-icons/core/assets/fill/shield-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/shield-star.svg';
import '@phosphor-icons/core/assets/fill/shield-star-fill.svg';
import '@phosphor-icons/core/assets/regular/shield-warning.svg';
import '@phosphor-icons/core/assets/fill/shield-warning-fill.svg';
import '@phosphor-icons/core/assets/regular/shirt-folded.svg';
import '@phosphor-icons/core/assets/fill/shirt-folded-fill.svg';
import '@phosphor-icons/core/assets/regular/shooting-star.svg';
import '@phosphor-icons/core/assets/fill/shooting-star-fill.svg';
import '@phosphor-icons/core/assets/regular/shopping-bag.svg';
import '@phosphor-icons/core/assets/fill/shopping-bag-fill.svg';
import '@phosphor-icons/core/assets/regular/shopping-bag-open.svg';
import '@phosphor-icons/core/assets/fill/shopping-bag-open-fill.svg';
import '@phosphor-icons/core/assets/regular/shopping-cart.svg';
import '@phosphor-icons/core/assets/fill/shopping-cart-fill.svg';
import '@phosphor-icons/core/assets/regular/shopping-cart-simple.svg';
import '@phosphor-icons/core/assets/fill/shopping-cart-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/shower.svg';
import '@phosphor-icons/core/assets/fill/shower-fill.svg';
import '@phosphor-icons/core/assets/regular/shrimp.svg';
import '@phosphor-icons/core/assets/fill/shrimp-fill.svg';
import '@phosphor-icons/core/assets/regular/shuffle.svg';
import '@phosphor-icons/core/assets/fill/shuffle-fill.svg';
import '@phosphor-icons/core/assets/regular/shuffle-angular.svg';
import '@phosphor-icons/core/assets/fill/shuffle-angular-fill.svg';
import '@phosphor-icons/core/assets/regular/shuffle-simple.svg';
import '@phosphor-icons/core/assets/fill/shuffle-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/sidebar.svg';
import '@phosphor-icons/core/assets/fill/sidebar-fill.svg';
import '@phosphor-icons/core/assets/regular/sidebar-simple.svg';
import '@phosphor-icons/core/assets/fill/sidebar-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/sigma.svg';
import '@phosphor-icons/core/assets/fill/sigma-fill.svg';
import '@phosphor-icons/core/assets/regular/sign-in.svg';
import '@phosphor-icons/core/assets/fill/sign-in-fill.svg';
import '@phosphor-icons/core/assets/regular/sign-out.svg';
import '@phosphor-icons/core/assets/fill/sign-out-fill.svg';
import '@phosphor-icons/core/assets/regular/signature.svg';
import '@phosphor-icons/core/assets/fill/signature-fill.svg';
import '@phosphor-icons/core/assets/regular/signpost.svg';
import '@phosphor-icons/core/assets/fill/signpost-fill.svg';
import '@phosphor-icons/core/assets/regular/sim-card.svg';
import '@phosphor-icons/core/assets/fill/sim-card-fill.svg';
import '@phosphor-icons/core/assets/regular/siren.svg';
import '@phosphor-icons/core/assets/fill/siren-fill.svg';
import '@phosphor-icons/core/assets/regular/sketch-logo.svg';
import '@phosphor-icons/core/assets/fill/sketch-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/skip-back.svg';
import '@phosphor-icons/core/assets/fill/skip-back-fill.svg';
import '@phosphor-icons/core/assets/regular/skip-back-circle.svg';
import '@phosphor-icons/core/assets/fill/skip-back-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/skip-forward.svg';
import '@phosphor-icons/core/assets/fill/skip-forward-fill.svg';
import '@phosphor-icons/core/assets/regular/skip-forward-circle.svg';
import '@phosphor-icons/core/assets/fill/skip-forward-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/skull.svg';
import '@phosphor-icons/core/assets/fill/skull-fill.svg';
import '@phosphor-icons/core/assets/regular/slack-logo.svg';
import '@phosphor-icons/core/assets/fill/slack-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/sliders.svg';
import '@phosphor-icons/core/assets/fill/sliders-fill.svg';
import '@phosphor-icons/core/assets/regular/sliders-horizontal.svg';
import '@phosphor-icons/core/assets/fill/sliders-horizontal-fill.svg';
import '@phosphor-icons/core/assets/regular/slideshow.svg';
import '@phosphor-icons/core/assets/fill/slideshow-fill.svg';
import '@phosphor-icons/core/assets/regular/smiley.svg';
import '@phosphor-icons/core/assets/fill/smiley-fill.svg';
import '@phosphor-icons/core/assets/regular/smiley-angry.svg';
import '@phosphor-icons/core/assets/fill/smiley-angry-fill.svg';
import '@phosphor-icons/core/assets/regular/smiley-blank.svg';
import '@phosphor-icons/core/assets/fill/smiley-blank-fill.svg';
import '@phosphor-icons/core/assets/regular/smiley-meh.svg';
import '@phosphor-icons/core/assets/fill/smiley-meh-fill.svg';
import '@phosphor-icons/core/assets/regular/smiley-nervous.svg';
import '@phosphor-icons/core/assets/fill/smiley-nervous-fill.svg';
import '@phosphor-icons/core/assets/regular/smiley-sad.svg';
import '@phosphor-icons/core/assets/fill/smiley-sad-fill.svg';
import '@phosphor-icons/core/assets/regular/smiley-sticker.svg';
import '@phosphor-icons/core/assets/fill/smiley-sticker-fill.svg';
import '@phosphor-icons/core/assets/regular/smiley-wink.svg';
import '@phosphor-icons/core/assets/fill/smiley-wink-fill.svg';
import '@phosphor-icons/core/assets/regular/smiley-x-eyes.svg';
import '@phosphor-icons/core/assets/fill/smiley-x-eyes-fill.svg';
import '@phosphor-icons/core/assets/regular/snapchat-logo.svg';
import '@phosphor-icons/core/assets/fill/snapchat-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/sneaker.svg';
import '@phosphor-icons/core/assets/fill/sneaker-fill.svg';
import '@phosphor-icons/core/assets/regular/sneaker-move.svg';
import '@phosphor-icons/core/assets/fill/sneaker-move-fill.svg';
import '@phosphor-icons/core/assets/regular/snowflake.svg';
import '@phosphor-icons/core/assets/fill/snowflake-fill.svg';
import '@phosphor-icons/core/assets/regular/soccer-ball.svg';
import '@phosphor-icons/core/assets/fill/soccer-ball-fill.svg';
import '@phosphor-icons/core/assets/regular/sort-ascending.svg';
import '@phosphor-icons/core/assets/fill/sort-ascending-fill.svg';
import '@phosphor-icons/core/assets/regular/sort-descending.svg';
import '@phosphor-icons/core/assets/fill/sort-descending-fill.svg';
import '@phosphor-icons/core/assets/regular/soundcloud-logo.svg';
import '@phosphor-icons/core/assets/fill/soundcloud-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/spade.svg';
import '@phosphor-icons/core/assets/fill/spade-fill.svg';
import '@phosphor-icons/core/assets/regular/sparkle.svg';
import '@phosphor-icons/core/assets/fill/sparkle-fill.svg';
import '@phosphor-icons/core/assets/regular/speaker-hifi.svg';
import '@phosphor-icons/core/assets/fill/speaker-hifi-fill.svg';
import '@phosphor-icons/core/assets/regular/speaker-high.svg';
import '@phosphor-icons/core/assets/fill/speaker-high-fill.svg';
import '@phosphor-icons/core/assets/regular/speaker-low.svg';
import '@phosphor-icons/core/assets/fill/speaker-low-fill.svg';
import '@phosphor-icons/core/assets/regular/speaker-none.svg';
import '@phosphor-icons/core/assets/fill/speaker-none-fill.svg';
import '@phosphor-icons/core/assets/regular/speaker-simple-high.svg';
import '@phosphor-icons/core/assets/fill/speaker-simple-high-fill.svg';
import '@phosphor-icons/core/assets/regular/speaker-simple-low.svg';
import '@phosphor-icons/core/assets/fill/speaker-simple-low-fill.svg';
import '@phosphor-icons/core/assets/regular/speaker-simple-none.svg';
import '@phosphor-icons/core/assets/fill/speaker-simple-none-fill.svg';
import '@phosphor-icons/core/assets/regular/speaker-simple-slash.svg';
import '@phosphor-icons/core/assets/fill/speaker-simple-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/speaker-simple-x.svg';
import '@phosphor-icons/core/assets/fill/speaker-simple-x-fill.svg';
import '@phosphor-icons/core/assets/regular/speaker-slash.svg';
import '@phosphor-icons/core/assets/fill/speaker-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/speaker-x.svg';
import '@phosphor-icons/core/assets/fill/speaker-x-fill.svg';
import '@phosphor-icons/core/assets/regular/spinner.svg';
import '@phosphor-icons/core/assets/fill/spinner-fill.svg';
import '@phosphor-icons/core/assets/regular/spinner-gap.svg';
import '@phosphor-icons/core/assets/fill/spinner-gap-fill.svg';
import '@phosphor-icons/core/assets/regular/spiral.svg';
import '@phosphor-icons/core/assets/fill/spiral-fill.svg';
import '@phosphor-icons/core/assets/regular/split-horizontal.svg';
import '@phosphor-icons/core/assets/fill/split-horizontal-fill.svg';
import '@phosphor-icons/core/assets/regular/split-vertical.svg';
import '@phosphor-icons/core/assets/fill/split-vertical-fill.svg';
import '@phosphor-icons/core/assets/regular/spotify-logo.svg';
import '@phosphor-icons/core/assets/fill/spotify-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/square.svg';
import '@phosphor-icons/core/assets/fill/square-fill.svg';
import '@phosphor-icons/core/assets/regular/square-half.svg';
import '@phosphor-icons/core/assets/fill/square-half-fill.svg';
import '@phosphor-icons/core/assets/regular/square-half-bottom.svg';
import '@phosphor-icons/core/assets/fill/square-half-bottom-fill.svg';
import '@phosphor-icons/core/assets/regular/square-logo.svg';
import '@phosphor-icons/core/assets/fill/square-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/square-split-horizontal.svg';
import '@phosphor-icons/core/assets/fill/square-split-horizontal-fill.svg';
import '@phosphor-icons/core/assets/regular/square-split-vertical.svg';
import '@phosphor-icons/core/assets/fill/square-split-vertical-fill.svg';
import '@phosphor-icons/core/assets/regular/squares-four.svg';
import '@phosphor-icons/core/assets/fill/squares-four-fill.svg';
import '@phosphor-icons/core/assets/regular/stack.svg';
import '@phosphor-icons/core/assets/fill/stack-fill.svg';
import '@phosphor-icons/core/assets/regular/stack-overflow-logo.svg';
import '@phosphor-icons/core/assets/fill/stack-overflow-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/stack-simple.svg';
import '@phosphor-icons/core/assets/fill/stack-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/stairs.svg';
import '@phosphor-icons/core/assets/fill/stairs-fill.svg';
import '@phosphor-icons/core/assets/regular/stamp.svg';
import '@phosphor-icons/core/assets/fill/stamp-fill.svg';
import '@phosphor-icons/core/assets/regular/star.svg';
import '@phosphor-icons/core/assets/fill/star-fill.svg';
import '@phosphor-icons/core/assets/regular/star-and-crescent.svg';
import '@phosphor-icons/core/assets/fill/star-and-crescent-fill.svg';
import '@phosphor-icons/core/assets/regular/star-four.svg';
import '@phosphor-icons/core/assets/fill/star-four-fill.svg';
import '@phosphor-icons/core/assets/regular/star-half.svg';
import '@phosphor-icons/core/assets/fill/star-half-fill.svg';
import '@phosphor-icons/core/assets/regular/star-of-david.svg';
import '@phosphor-icons/core/assets/fill/star-of-david-fill.svg';
import '@phosphor-icons/core/assets/regular/steering-wheel.svg';
import '@phosphor-icons/core/assets/fill/steering-wheel-fill.svg';
import '@phosphor-icons/core/assets/regular/steps.svg';
import '@phosphor-icons/core/assets/fill/steps-fill.svg';
import '@phosphor-icons/core/assets/regular/stethoscope.svg';
import '@phosphor-icons/core/assets/fill/stethoscope-fill.svg';
import '@phosphor-icons/core/assets/regular/sticker.svg';
import '@phosphor-icons/core/assets/fill/sticker-fill.svg';
import '@phosphor-icons/core/assets/regular/stool.svg';
import '@phosphor-icons/core/assets/fill/stool-fill.svg';
import '@phosphor-icons/core/assets/regular/stop.svg';
import '@phosphor-icons/core/assets/fill/stop-fill.svg';
import '@phosphor-icons/core/assets/regular/stop-circle.svg';
import '@phosphor-icons/core/assets/fill/stop-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/storefront.svg';
import '@phosphor-icons/core/assets/fill/storefront-fill.svg';
import '@phosphor-icons/core/assets/regular/strategy.svg';
import '@phosphor-icons/core/assets/fill/strategy-fill.svg';
import '@phosphor-icons/core/assets/regular/stripe-logo.svg';
import '@phosphor-icons/core/assets/fill/stripe-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/student.svg';
import '@phosphor-icons/core/assets/fill/student-fill.svg';
import '@phosphor-icons/core/assets/regular/subtitles.svg';
import '@phosphor-icons/core/assets/fill/subtitles-fill.svg';
import '@phosphor-icons/core/assets/regular/subtract.svg';
import '@phosphor-icons/core/assets/fill/subtract-fill.svg';
import '@phosphor-icons/core/assets/regular/subtract-square.svg';
import '@phosphor-icons/core/assets/fill/subtract-square-fill.svg';
import '@phosphor-icons/core/assets/regular/suitcase.svg';
import '@phosphor-icons/core/assets/fill/suitcase-fill.svg';
import '@phosphor-icons/core/assets/regular/suitcase-rolling.svg';
import '@phosphor-icons/core/assets/fill/suitcase-rolling-fill.svg';
import '@phosphor-icons/core/assets/regular/suitcase-simple.svg';
import '@phosphor-icons/core/assets/fill/suitcase-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/sun.svg';
import '@phosphor-icons/core/assets/fill/sun-fill.svg';
import '@phosphor-icons/core/assets/regular/sun-dim.svg';
import '@phosphor-icons/core/assets/fill/sun-dim-fill.svg';
import '@phosphor-icons/core/assets/regular/sun-horizon.svg';
import '@phosphor-icons/core/assets/fill/sun-horizon-fill.svg';
import '@phosphor-icons/core/assets/regular/sunglasses.svg';
import '@phosphor-icons/core/assets/fill/sunglasses-fill.svg';
import '@phosphor-icons/core/assets/regular/swap.svg';
import '@phosphor-icons/core/assets/fill/swap-fill.svg';
import '@phosphor-icons/core/assets/regular/swatches.svg';
import '@phosphor-icons/core/assets/fill/swatches-fill.svg';
import '@phosphor-icons/core/assets/regular/swimming-pool.svg';
import '@phosphor-icons/core/assets/fill/swimming-pool-fill.svg';
import '@phosphor-icons/core/assets/regular/sword.svg';
import '@phosphor-icons/core/assets/fill/sword-fill.svg';
import '@phosphor-icons/core/assets/regular/synagogue.svg';
import '@phosphor-icons/core/assets/fill/synagogue-fill.svg';
import '@phosphor-icons/core/assets/regular/syringe.svg';
import '@phosphor-icons/core/assets/fill/syringe-fill.svg';
import '@phosphor-icons/core/assets/regular/t-shirt.svg';
import '@phosphor-icons/core/assets/fill/t-shirt-fill.svg';
import '@phosphor-icons/core/assets/regular/table.svg';
import '@phosphor-icons/core/assets/fill/table-fill.svg';
import '@phosphor-icons/core/assets/regular/tabs.svg';
import '@phosphor-icons/core/assets/fill/tabs-fill.svg';
import '@phosphor-icons/core/assets/regular/tag.svg';
import '@phosphor-icons/core/assets/fill/tag-fill.svg';
import '@phosphor-icons/core/assets/regular/tag-chevron.svg';
import '@phosphor-icons/core/assets/fill/tag-chevron-fill.svg';
import '@phosphor-icons/core/assets/regular/tag-simple.svg';
import '@phosphor-icons/core/assets/fill/tag-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/target.svg';
import '@phosphor-icons/core/assets/fill/target-fill.svg';
import '@phosphor-icons/core/assets/regular/taxi.svg';
import '@phosphor-icons/core/assets/fill/taxi-fill.svg';
import '@phosphor-icons/core/assets/regular/telegram-logo.svg';
import '@phosphor-icons/core/assets/fill/telegram-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/television.svg';
import '@phosphor-icons/core/assets/fill/television-fill.svg';
import '@phosphor-icons/core/assets/regular/television-simple.svg';
import '@phosphor-icons/core/assets/fill/television-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/tennis-ball.svg';
import '@phosphor-icons/core/assets/fill/tennis-ball-fill.svg';
import '@phosphor-icons/core/assets/regular/tent.svg';
import '@phosphor-icons/core/assets/fill/tent-fill.svg';
import '@phosphor-icons/core/assets/regular/terminal.svg';
import '@phosphor-icons/core/assets/fill/terminal-fill.svg';
import '@phosphor-icons/core/assets/regular/terminal-window.svg';
import '@phosphor-icons/core/assets/fill/terminal-window-fill.svg';
import '@phosphor-icons/core/assets/regular/test-tube.svg';
import '@phosphor-icons/core/assets/fill/test-tube-fill.svg';
import '@phosphor-icons/core/assets/regular/text-a-underline.svg';
import '@phosphor-icons/core/assets/fill/text-a-underline-fill.svg';
import '@phosphor-icons/core/assets/regular/text-aa.svg';
import '@phosphor-icons/core/assets/fill/text-aa-fill.svg';
import '@phosphor-icons/core/assets/regular/text-align-center.svg';
import '@phosphor-icons/core/assets/fill/text-align-center-fill.svg';
import '@phosphor-icons/core/assets/regular/text-align-justify.svg';
import '@phosphor-icons/core/assets/fill/text-align-justify-fill.svg';
import '@phosphor-icons/core/assets/regular/text-align-left.svg';
import '@phosphor-icons/core/assets/fill/text-align-left-fill.svg';
import '@phosphor-icons/core/assets/regular/text-align-right.svg';
import '@phosphor-icons/core/assets/fill/text-align-right-fill.svg';
import '@phosphor-icons/core/assets/regular/text-b.svg';
import '@phosphor-icons/core/assets/fill/text-b-fill.svg';
import '@phosphor-icons/core/assets/regular/text-columns.svg';
import '@phosphor-icons/core/assets/fill/text-columns-fill.svg';
import '@phosphor-icons/core/assets/regular/text-h.svg';
import '@phosphor-icons/core/assets/fill/text-h-fill.svg';
import '@phosphor-icons/core/assets/regular/text-h-five.svg';
import '@phosphor-icons/core/assets/fill/text-h-five-fill.svg';
import '@phosphor-icons/core/assets/regular/text-h-four.svg';
import '@phosphor-icons/core/assets/fill/text-h-four-fill.svg';
import '@phosphor-icons/core/assets/regular/text-h-one.svg';
import '@phosphor-icons/core/assets/fill/text-h-one-fill.svg';
import '@phosphor-icons/core/assets/regular/text-h-six.svg';
import '@phosphor-icons/core/assets/fill/text-h-six-fill.svg';
import '@phosphor-icons/core/assets/regular/text-h-three.svg';
import '@phosphor-icons/core/assets/fill/text-h-three-fill.svg';
import '@phosphor-icons/core/assets/regular/text-h-two.svg';
import '@phosphor-icons/core/assets/fill/text-h-two-fill.svg';
import '@phosphor-icons/core/assets/regular/text-indent.svg';
import '@phosphor-icons/core/assets/fill/text-indent-fill.svg';
import '@phosphor-icons/core/assets/regular/text-italic.svg';
import '@phosphor-icons/core/assets/fill/text-italic-fill.svg';
import '@phosphor-icons/core/assets/regular/text-outdent.svg';
import '@phosphor-icons/core/assets/fill/text-outdent-fill.svg';
import '@phosphor-icons/core/assets/regular/text-strikethrough.svg';
import '@phosphor-icons/core/assets/fill/text-strikethrough-fill.svg';
import '@phosphor-icons/core/assets/regular/text-t.svg';
import '@phosphor-icons/core/assets/fill/text-t-fill.svg';
import '@phosphor-icons/core/assets/regular/text-underline.svg';
import '@phosphor-icons/core/assets/fill/text-underline-fill.svg';
import '@phosphor-icons/core/assets/regular/textbox.svg';
import '@phosphor-icons/core/assets/fill/textbox-fill.svg';
import '@phosphor-icons/core/assets/regular/thermometer.svg';
import '@phosphor-icons/core/assets/fill/thermometer-fill.svg';
import '@phosphor-icons/core/assets/regular/thermometer-cold.svg';
import '@phosphor-icons/core/assets/fill/thermometer-cold-fill.svg';
import '@phosphor-icons/core/assets/regular/thermometer-hot.svg';
import '@phosphor-icons/core/assets/fill/thermometer-hot-fill.svg';
import '@phosphor-icons/core/assets/regular/thermometer-simple.svg';
import '@phosphor-icons/core/assets/fill/thermometer-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/thumbs-down.svg';
import '@phosphor-icons/core/assets/fill/thumbs-down-fill.svg';
import '@phosphor-icons/core/assets/regular/thumbs-up.svg';
import '@phosphor-icons/core/assets/fill/thumbs-up-fill.svg';
import '@phosphor-icons/core/assets/regular/ticket.svg';
import '@phosphor-icons/core/assets/fill/ticket-fill.svg';
import '@phosphor-icons/core/assets/regular/tidal-logo.svg';
import '@phosphor-icons/core/assets/fill/tidal-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/tiktok-logo.svg';
import '@phosphor-icons/core/assets/fill/tiktok-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/timer.svg';
import '@phosphor-icons/core/assets/fill/timer-fill.svg';
import '@phosphor-icons/core/assets/regular/tipi.svg';
import '@phosphor-icons/core/assets/fill/tipi-fill.svg';
import '@phosphor-icons/core/assets/regular/toggle-left.svg';
import '@phosphor-icons/core/assets/fill/toggle-left-fill.svg';
import '@phosphor-icons/core/assets/regular/toggle-right.svg';
import '@phosphor-icons/core/assets/fill/toggle-right-fill.svg';
import '@phosphor-icons/core/assets/regular/toilet.svg';
import '@phosphor-icons/core/assets/fill/toilet-fill.svg';
import '@phosphor-icons/core/assets/regular/toilet-paper.svg';
import '@phosphor-icons/core/assets/fill/toilet-paper-fill.svg';
import '@phosphor-icons/core/assets/regular/toolbox.svg';
import '@phosphor-icons/core/assets/fill/toolbox-fill.svg';
import '@phosphor-icons/core/assets/regular/tooth.svg';
import '@phosphor-icons/core/assets/fill/tooth-fill.svg';
import '@phosphor-icons/core/assets/regular/tote.svg';
import '@phosphor-icons/core/assets/fill/tote-fill.svg';
import '@phosphor-icons/core/assets/regular/tote-simple.svg';
import '@phosphor-icons/core/assets/fill/tote-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/trademark.svg';
import '@phosphor-icons/core/assets/fill/trademark-fill.svg';
import '@phosphor-icons/core/assets/regular/trademark-registered.svg';
import '@phosphor-icons/core/assets/fill/trademark-registered-fill.svg';
import '@phosphor-icons/core/assets/regular/traffic-cone.svg';
import '@phosphor-icons/core/assets/fill/traffic-cone-fill.svg';
import '@phosphor-icons/core/assets/regular/traffic-sign.svg';
import '@phosphor-icons/core/assets/fill/traffic-sign-fill.svg';
import '@phosphor-icons/core/assets/regular/traffic-signal.svg';
import '@phosphor-icons/core/assets/fill/traffic-signal-fill.svg';
import '@phosphor-icons/core/assets/regular/train.svg';
import '@phosphor-icons/core/assets/fill/train-fill.svg';
import '@phosphor-icons/core/assets/regular/train-regional.svg';
import '@phosphor-icons/core/assets/fill/train-regional-fill.svg';
import '@phosphor-icons/core/assets/regular/train-simple.svg';
import '@phosphor-icons/core/assets/fill/train-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/tram.svg';
import '@phosphor-icons/core/assets/fill/tram-fill.svg';
import '@phosphor-icons/core/assets/regular/translate.svg';
import '@phosphor-icons/core/assets/fill/translate-fill.svg';
import '@phosphor-icons/core/assets/regular/trash.svg';
import '@phosphor-icons/core/assets/fill/trash-fill.svg';
import '@phosphor-icons/core/assets/regular/trash-simple.svg';
import '@phosphor-icons/core/assets/fill/trash-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/tray.svg';
import '@phosphor-icons/core/assets/fill/tray-fill.svg';
import '@phosphor-icons/core/assets/regular/tree.svg';
import '@phosphor-icons/core/assets/fill/tree-fill.svg';
import '@phosphor-icons/core/assets/regular/tree-evergreen.svg';
import '@phosphor-icons/core/assets/fill/tree-evergreen-fill.svg';
import '@phosphor-icons/core/assets/regular/tree-palm.svg';
import '@phosphor-icons/core/assets/fill/tree-palm-fill.svg';
import '@phosphor-icons/core/assets/regular/tree-structure.svg';
import '@phosphor-icons/core/assets/fill/tree-structure-fill.svg';
import '@phosphor-icons/core/assets/regular/trend-down.svg';
import '@phosphor-icons/core/assets/fill/trend-down-fill.svg';
import '@phosphor-icons/core/assets/regular/trend-up.svg';
import '@phosphor-icons/core/assets/fill/trend-up-fill.svg';
import '@phosphor-icons/core/assets/regular/triangle.svg';
import '@phosphor-icons/core/assets/fill/triangle-fill.svg';
import '@phosphor-icons/core/assets/regular/trophy.svg';
import '@phosphor-icons/core/assets/fill/trophy-fill.svg';
import '@phosphor-icons/core/assets/regular/truck.svg';
import '@phosphor-icons/core/assets/fill/truck-fill.svg';
import '@phosphor-icons/core/assets/regular/twitch-logo.svg';
import '@phosphor-icons/core/assets/fill/twitch-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/twitter-logo.svg';
import '@phosphor-icons/core/assets/fill/twitter-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/umbrella.svg';
import '@phosphor-icons/core/assets/fill/umbrella-fill.svg';
import '@phosphor-icons/core/assets/regular/umbrella-simple.svg';
import '@phosphor-icons/core/assets/fill/umbrella-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/unite.svg';
import '@phosphor-icons/core/assets/fill/unite-fill.svg';
import '@phosphor-icons/core/assets/regular/unite-square.svg';
import '@phosphor-icons/core/assets/fill/unite-square-fill.svg';
import '@phosphor-icons/core/assets/regular/upload.svg';
import '@phosphor-icons/core/assets/fill/upload-fill.svg';
import '@phosphor-icons/core/assets/regular/upload-simple.svg';
import '@phosphor-icons/core/assets/fill/upload-simple-fill.svg';
import '@phosphor-icons/core/assets/regular/usb.svg';
import '@phosphor-icons/core/assets/fill/usb-fill.svg';
import '@phosphor-icons/core/assets/regular/user.svg';
import '@phosphor-icons/core/assets/fill/user-fill.svg';
import '@phosphor-icons/core/assets/regular/user-circle.svg';
import '@phosphor-icons/core/assets/fill/user-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/user-circle-gear.svg';
import '@phosphor-icons/core/assets/fill/user-circle-gear-fill.svg';
import '@phosphor-icons/core/assets/regular/user-circle-minus.svg';
import '@phosphor-icons/core/assets/fill/user-circle-minus-fill.svg';
import '@phosphor-icons/core/assets/regular/user-circle-plus.svg';
import '@phosphor-icons/core/assets/fill/user-circle-plus-fill.svg';
import '@phosphor-icons/core/assets/regular/user-focus.svg';
import '@phosphor-icons/core/assets/fill/user-focus-fill.svg';
import '@phosphor-icons/core/assets/regular/user-gear.svg';
import '@phosphor-icons/core/assets/fill/user-gear-fill.svg';
import '@phosphor-icons/core/assets/regular/user-list.svg';
import '@phosphor-icons/core/assets/fill/user-list-fill.svg';
import '@phosphor-icons/core/assets/regular/user-minus.svg';
import '@phosphor-icons/core/assets/fill/user-minus-fill.svg';
import '@phosphor-icons/core/assets/regular/user-plus.svg';
import '@phosphor-icons/core/assets/fill/user-plus-fill.svg';
import '@phosphor-icons/core/assets/regular/user-rectangle.svg';
import '@phosphor-icons/core/assets/fill/user-rectangle-fill.svg';
import '@phosphor-icons/core/assets/regular/user-square.svg';
import '@phosphor-icons/core/assets/fill/user-square-fill.svg';
import '@phosphor-icons/core/assets/regular/user-switch.svg';
import '@phosphor-icons/core/assets/fill/user-switch-fill.svg';
import '@phosphor-icons/core/assets/regular/users.svg';
import '@phosphor-icons/core/assets/fill/users-fill.svg';
import '@phosphor-icons/core/assets/regular/users-four.svg';
import '@phosphor-icons/core/assets/fill/users-four-fill.svg';
import '@phosphor-icons/core/assets/regular/users-three.svg';
import '@phosphor-icons/core/assets/fill/users-three-fill.svg';
import '@phosphor-icons/core/assets/regular/van.svg';
import '@phosphor-icons/core/assets/fill/van-fill.svg';
import '@phosphor-icons/core/assets/regular/vault.svg';
import '@phosphor-icons/core/assets/fill/vault-fill.svg';
import '@phosphor-icons/core/assets/regular/vibrate.svg';
import '@phosphor-icons/core/assets/fill/vibrate-fill.svg';
import '@phosphor-icons/core/assets/regular/video.svg';
import '@phosphor-icons/core/assets/fill/video-fill.svg';
import '@phosphor-icons/core/assets/regular/video-camera.svg';
import '@phosphor-icons/core/assets/fill/video-camera-fill.svg';
import '@phosphor-icons/core/assets/regular/video-camera-slash.svg';
import '@phosphor-icons/core/assets/fill/video-camera-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/vignette.svg';
import '@phosphor-icons/core/assets/fill/vignette-fill.svg';
import '@phosphor-icons/core/assets/regular/vinyl-record.svg';
import '@phosphor-icons/core/assets/fill/vinyl-record-fill.svg';
import '@phosphor-icons/core/assets/regular/virtual-reality.svg';
import '@phosphor-icons/core/assets/fill/virtual-reality-fill.svg';
import '@phosphor-icons/core/assets/regular/virus.svg';
import '@phosphor-icons/core/assets/fill/virus-fill.svg';
import '@phosphor-icons/core/assets/regular/voicemail.svg';
import '@phosphor-icons/core/assets/fill/voicemail-fill.svg';
import '@phosphor-icons/core/assets/regular/volleyball.svg';
import '@phosphor-icons/core/assets/fill/volleyball-fill.svg';
import '@phosphor-icons/core/assets/regular/wall.svg';
import '@phosphor-icons/core/assets/fill/wall-fill.svg';
import '@phosphor-icons/core/assets/regular/wallet.svg';
import '@phosphor-icons/core/assets/fill/wallet-fill.svg';
import '@phosphor-icons/core/assets/regular/warehouse.svg';
import '@phosphor-icons/core/assets/fill/warehouse-fill.svg';
import { ReactComponent as ReactComponent$1 } from '@phosphor-icons/core/assets/regular/warning.svg';
import '@phosphor-icons/core/assets/fill/warning-fill.svg';
import { ReactComponent as ReactComponent$3 } from '@phosphor-icons/core/assets/regular/warning-circle.svg';
import '@phosphor-icons/core/assets/fill/warning-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/warning-diamond.svg';
import '@phosphor-icons/core/assets/fill/warning-diamond-fill.svg';
import '@phosphor-icons/core/assets/regular/warning-octagon.svg';
import '@phosphor-icons/core/assets/fill/warning-octagon-fill.svg';
import '@phosphor-icons/core/assets/regular/watch.svg';
import '@phosphor-icons/core/assets/fill/watch-fill.svg';
import '@phosphor-icons/core/assets/regular/wave-sawtooth.svg';
import '@phosphor-icons/core/assets/fill/wave-sawtooth-fill.svg';
import '@phosphor-icons/core/assets/regular/wave-sine.svg';
import '@phosphor-icons/core/assets/fill/wave-sine-fill.svg';
import '@phosphor-icons/core/assets/regular/wave-square.svg';
import '@phosphor-icons/core/assets/fill/wave-square-fill.svg';
import '@phosphor-icons/core/assets/regular/wave-triangle.svg';
import '@phosphor-icons/core/assets/fill/wave-triangle-fill.svg';
import '@phosphor-icons/core/assets/regular/waveform.svg';
import '@phosphor-icons/core/assets/fill/waveform-fill.svg';
import '@phosphor-icons/core/assets/regular/waves.svg';
import '@phosphor-icons/core/assets/fill/waves-fill.svg';
import '@phosphor-icons/core/assets/regular/webcam.svg';
import '@phosphor-icons/core/assets/fill/webcam-fill.svg';
import '@phosphor-icons/core/assets/regular/webcam-slash.svg';
import '@phosphor-icons/core/assets/fill/webcam-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/webhooks-logo.svg';
import '@phosphor-icons/core/assets/fill/webhooks-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/wechat-logo.svg';
import '@phosphor-icons/core/assets/fill/wechat-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/whatsapp-logo.svg';
import '@phosphor-icons/core/assets/fill/whatsapp-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/wheelchair.svg';
import '@phosphor-icons/core/assets/fill/wheelchair-fill.svg';
import '@phosphor-icons/core/assets/regular/wheelchair-motion.svg';
import '@phosphor-icons/core/assets/fill/wheelchair-motion-fill.svg';
import '@phosphor-icons/core/assets/regular/wifi-high.svg';
import '@phosphor-icons/core/assets/fill/wifi-high-fill.svg';
import '@phosphor-icons/core/assets/regular/wifi-low.svg';
import '@phosphor-icons/core/assets/fill/wifi-low-fill.svg';
import '@phosphor-icons/core/assets/regular/wifi-medium.svg';
import '@phosphor-icons/core/assets/fill/wifi-medium-fill.svg';
import '@phosphor-icons/core/assets/regular/wifi-none.svg';
import '@phosphor-icons/core/assets/fill/wifi-none-fill.svg';
import '@phosphor-icons/core/assets/regular/wifi-slash.svg';
import '@phosphor-icons/core/assets/fill/wifi-slash-fill.svg';
import '@phosphor-icons/core/assets/regular/wifi-x.svg';
import '@phosphor-icons/core/assets/fill/wifi-x-fill.svg';
import '@phosphor-icons/core/assets/regular/wind.svg';
import '@phosphor-icons/core/assets/fill/wind-fill.svg';
import '@phosphor-icons/core/assets/regular/windows-logo.svg';
import '@phosphor-icons/core/assets/fill/windows-logo-fill.svg';
import '@phosphor-icons/core/assets/regular/wine.svg';
import '@phosphor-icons/core/assets/fill/wine-fill.svg';
import '@phosphor-icons/core/assets/regular/wrench.svg';
import '@phosphor-icons/core/assets/fill/wrench-fill.svg';
import { ReactComponent as ReactComponent$4 } from '@phosphor-icons/core/assets/regular/x.svg';
import '@phosphor-icons/core/assets/fill/x-fill.svg';
import '@phosphor-icons/core/assets/regular/x-circle.svg';
import '@phosphor-icons/core/assets/fill/x-circle-fill.svg';
import '@phosphor-icons/core/assets/regular/x-square.svg';
import '@phosphor-icons/core/assets/fill/x-square-fill.svg';
import '@phosphor-icons/core/assets/regular/yin-yang.svg';
import '@phosphor-icons/core/assets/fill/yin-yang-fill.svg';
import '@phosphor-icons/core/assets/regular/youtube-logo.svg';
import '@phosphor-icons/core/assets/fill/youtube-logo-fill.svg';
import { TextInput, ScrollView as ScrollView$1, Platform } from 'react-native';

const fullscreenStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
const getBorderAdditionalInteraction = ({
  internalForcedPseudoState,
  disabled,
  interactive
}) => {
  const prefix = interactive === "text" ? "interactive.forms" : "interactive";
  if (disabled) {
    return {
      borderColor: `$${prefix}.borderColor:disabled`
    };
  }
  if (process.env.STORYBOOK && internalForcedPseudoState) {
    switch (internalForcedPseudoState) {
      case "hover":
        return {
          borderColor: `$${prefix}.borderColor:hover`
        };
      case `press`:
        return {
          borderColor: `$${prefix}.borderColor:press`
        };
      case `focus`:
        return {
          borderColor: `$${prefix}.borderColor:focus`
        };
    }
  }
  return {
    borderColor: `$${prefix}.borderColor`,
    hoverStyle: {
      borderColor: `$${prefix}.borderColor:hover`
    },
    pressStyle: {
      borderColor: `$${prefix}.borderColor:press`
    },
    focusStyle: {
      borderColor: `$${prefix}.borderColor:focus`
    }
  };
};
const getBackgroundAdditionalInteraction = ({
  internalForcedPseudoState,
  disabled,
  interactive,
  variant
}) => {
  const prefix = interactive === "text" ? "interactive.forms" : `interactive.${variant || "contained"}`;
  if (disabled) {
    return {
      backgroundColor: `$${prefix}.backgroundColor:disabled`
    };
  }
  if (process.env.STORYBOOK && internalForcedPseudoState) {
    switch (internalForcedPseudoState) {
      case "hover":
        return {
          backgroundColor: `$${prefix}.backgroundColor:hover`
        };
      case `press`:
        return {
          backgroundColor: `$${prefix}.backgroundColor:press`
        };
      case `focus`:
        return {
          backgroundColor: `$${prefix}.backgroundColor:focus`
        };
    }
  }
  return {
    backgroundColor: `$${prefix}.backgroundColor`,
    hoverStyle: {
      backgroundColor: `$${prefix}.backgroundColor:hover`
    },
    pressStyle: {
      backgroundColor: `$${prefix}.backgroundColor:press`
    },
    focusStyle: {
      backgroundColor: `$${prefix}.backgroundColor:focus`
    }
  };
};

const internalForcedPseudoState = (val) => ({});
const withBorder = (val, { props }) => {
  return {
    borderWidth: typeof val === "number" ? val : 1,
    borderColor: "$borderColor",
    ...props.interactive ? getBorderAdditionalInteraction(props) : void 0
  };
};
const withBackground = (val, { props }) => {
  const variant = props.interactive === "text" ? "text" : props.variant || "contained";
  if (!val) return {};
  if (!props.role && !props.outlineStyle && props.interactive) {
    throw new Error("A role prop is required while using interactive");
  }
  return {
    backgroundColor: props.interactive ? `$interactive.${variant}.backgroundColor` : "$mainColor",
    ...props.interactive ? getBackgroundAdditionalInteraction(props) : void 0
  };
};
const circularStyle = {
  borderRadius: 1e5,
  padding: 0
};
const size = (val) => {
  return { width: val, height: val };
};
const circular = {
  true: (val, { props, tokens }) => {
    if (!("size" in props)) {
      return circularStyle;
    }
    const sizePropValue = props.size;
    const sizeValue = tokens.size[sizePropValue];
    return {
      ...circularStyle,
      width: sizeValue,
      height: sizeValue,
      maxWidth: sizeValue,
      maxHeight: sizeValue,
      minWidth: sizeValue,
      minHeight: sizeValue
    };
  }
};
const interactive = (isInteractiveOrInteractiveCursorType, { props }) => isInteractiveOrInteractiveCursorType ? {
  cursor: props.disabled ? "not-allowed" : isInteractiveOrInteractiveCursorType === true ? "pointer" : isInteractiveOrInteractiveCursorType
} : null;
const centered = {
  true: {
    alignItems: "center",
    justifyContent: "center"
  }
};

const variants$1 = {
  __proto__: null,
  centered: centered,
  circular: circular,
  interactive: interactive,
  internalForcedPseudoState: internalForcedPseudoState,
  size: size,
  withBackground: withBackground,
  withBorder: withBorder
};

const Frame = styled(View, {
  name: "Frame",
  variants: variants$1,
  animation: "fast"
});

function Icon({
  icon,
  size = 20,
  align = "auto",
  contrast,
  color = contrast ? "$contrastTextColor" : "$textColor",
  ...props
}) {
  const style = useStyle({
    color
    // if needed for native
    // resolveValues: Platform.OS === 'web' ? undefined: 'value',
  });
  return /* @__PURE__ */ jsx(
    Frame,
    {
      ...props,
      centered: true,
      alignSelf: align,
      size,
      style,
      children: icon
    }
  );
}

const Pressable = styled(Frame, {
  interactive: true
});

const IconButtonFrame = styled(Pressable, {
  name: "IconButtonFrame",
  role: "button",
  centered: true,
  withBorder: true,
  withBackground: true,
  size: 40,
  borderWidth: 1,
  borderRadius: 1e4
});
function IconButton({
  icon,
  disabled,
  size = 40,
  ...pressableProps
}) {
  return /* @__PURE__ */ jsx(IconButtonFrame, { size, disabled, ...pressableProps, children: /* @__PURE__ */ jsx(
    Icon,
    {
      size: size / 2,
      color: disabled ? "$contrastDisabled" : void 0,
      contrast: !disabled,
      icon
    }
  ) });
}

const variants = {
  fullscreen: {
    true: fullscreenStyle
  }
};
const Stack = styled(View, {
  name: "Stack",
  variants: {
    ...variants,
    type: {
      h: {
        flexDirection: "row"
      },
      v: {
        flexDirection: "column"
      }
    }
  }
});
const HStack = styled(Stack, {
  name: "HStack",
  flexDirection: "row",
  variants
});
const VStack = styled(Stack, {
  name: "VStack",
  flexDirection: "column"
});

const Typography = styled(Text, {
  name: "Typography",
  fontFamily: "$body",
  color: "$textColor",
  fontWeight: "$regular",
  variants: {
    size: {
      xl: { fontSize: "$xl", lineHeight: "$xl" },
      lg: { fontSize: "$lg", lineHeight: "$lg" },
      md: { fontSize: "$md", lineHeight: "$md" },
      sm: { fontSize: "$sm", lineHeight: "$sm" },
      xs: { fontSize: "$xs", lineHeight: "$xs" }
    },
    weight: {
      regular: { fontWeight: "$regular" },
      bold: { fontWeight: "$bold" },
      black: { fontWeight: "$black" }
    },
    family: {
      heading: { fontFamily: "$heading" },
      body: { fontFamily: "$body" }
    },
    contrast: {
      true: {
        color: "$contrastTextColor"
      }
    }
  },
  defaultVariants: {
    size: "md",
    weight: "regular",
    family: "body"
  }
});
const TypographyParagraph = styled(Typography, {
  name: "TypographyParagraph",
  tag: "p",
  userSelect: "auto",
  family: "body"
});
const TypographySizeContext = createContext(void 0);
const TypographyWithContext = Typography.styleable(
  ({ size, ...props }, ref) => {
    const ancestorSize = useContext(TypographySizeContext);
    const sizeOrAncestorSizeOrDefaultSize = size || ancestorSize;
    if (sizeOrAncestorSizeOrDefaultSize !== size) {
      return /* @__PURE__ */ jsx(TypographySizeContext.Provider, { value: sizeOrAncestorSizeOrDefaultSize, children: /* @__PURE__ */ jsx(Typography, { ref, size, ...props }) });
    }
    return /* @__PURE__ */ jsx(Typography, { ref, size, ...props });
  }
);
const TypographyParagraphWithContext = TypographyParagraph.styleable(
  ({ size, ...props }, ref) => {
    const ancestorSize = useContext(TypographySizeContext);
    const sizeOrAncestorSizeOrDefaultSize = size || ancestorSize;
    return /* @__PURE__ */ jsx(TypographySizeContext.Provider, { value: sizeOrAncestorSizeOrDefaultSize, children: /* @__PURE__ */ jsx(Typography, { ref, size, ...props }) });
  }
);

const ButtonFrame = styled(Pressable, {
  name: "ButtonFrame",
  role: "button",
  centered: true,
  minHeight: 42,
  borderRadius: "$sm",
  paddingHorizontal: "$md",
  variants: {
    variant: {
      contained: {
        withBackground: true
      },
      outlined: {
        withBackground: true,
        withBorder: true
      }
    }
  },
  defaultVariants: {
    variant: "contained"
  }
});
function Button({
  icon,
  text,
  disabled,
  variant,
  ...pressableProps
}) {
  return /* @__PURE__ */ jsx(ButtonFrame, { disabled, variant, ...pressableProps, children: /* @__PURE__ */ jsxs(HStack, { gap: "$xs", alignItems: "center", children: [
    icon && /* @__PURE__ */ jsx(
      Icon,
      {
        color: disabled ? "$contrastDisabled" : void 0,
        contrast: variant === "contained" && !disabled,
        icon
      }
    ),
    /* @__PURE__ */ jsx(
      Typography,
      {
        size: "md",
        weight: "bold",
        paddingVertical: "$xs",
        color: disabled ? "$contrastDisabled" : void 0,
        contrast: variant === "contained" && !disabled,
        children: text
      }
    )
  ] }) });
}

function FeedbackIcon({ type }) {
  switch (type) {
    case "warning":
      return /* @__PURE__ */ jsx(ReactComponent$3, {});
    case "success":
      return /* @__PURE__ */ jsx(ReactComponent$2, {});
    case "danger":
      return /* @__PURE__ */ jsx(ReactComponent$1, {});
    default:
      return /* @__PURE__ */ jsx(ReactComponent, {});
  }
}

const MessageFrame = styled(Frame, {
  name: "MessageFrame",
  alignItems: "center",
  withBackground: true,
  borderRadius: "$md",
  paddingHorizontal: "$4",
  flexDirection: "row",
  gap: "$4"
});
const MessageText = styled(Typography, {
  name: "MessageText",
  contrast: true,
  size: "md",
  flexGrow: 1,
  paddingVertical: "$4",
  variants: {
    centered: {
      true: {
        textAlign: "center",
        paddingHorizontal: "$4"
      }
    }
  }
});
const MessageIconContainer = styled(View, {
  name: "MessageIconContainer",
  alignItems: "center"
});
const MessageDismissButtonContainer = styled(View, {
  name: "MessageDismissButtonContainer",
  marginRight: "$2"
});
function Message({
  theme,
  textCentered,
  children,
  onDismiss
}) {
  return /* @__PURE__ */ jsxs(MessageFrame, { theme, children: [
    textCentered ? null : /* @__PURE__ */ jsx(MessageIconContainer, { children: /* @__PURE__ */ jsx(Icon, { contrast: true, icon: /* @__PURE__ */ jsx(FeedbackIcon, { type: theme }) }) }),
    /* @__PURE__ */ jsx(MessageText, { centered: textCentered, children }),
    onDismiss ? /* @__PURE__ */ jsx(MessageDismissButtonContainer, { children: /* @__PURE__ */ jsx(IconButton, { icon: /* @__PURE__ */ jsx(ReactComponent$4, {}), size: 40 }) }) : null
  ] });
}

const StyledInputText = styled(TextInput, {
  variants: variants$1,
  padding: "$xs",
  borderRadius: "$sm",
  // @ts-expect-error missing prop but seems to work
  color: "$forms.textColor",
  withBorder: true,
  withBackground: true,
  borderWidth: 1,
  borderBottomWidth: 3,
  // reset browser style
  outlineStyle: "none"
});
const InputText = styled(StyledInputText, {
  name: "InputText",
  interactive: "text",
  theme: "primary"
  // animation: "formElement", // remove all style ?
});
styled(InputText, {
  multiline: true
});

const ScrollView = styled(
  ScrollView$1,
  {
    name: "ScrollView",
    scrollEnabled: true,
    variants: {
      fullscreen: {
        true: fullscreenStyle
      }
    }
  },
  {
    accept: {
      contentContainerStyle: "style"
    }
  }
);

const StoryTitle = styled(Typography, {
  family: "heading",
  weight: "black",
  variants: {
    level: {
      1: { size: "xl", marginBottom: "$8" },
      2: { size: "lg", marginBottom: "$8" },
      3: { size: "md", marginBottom: "$3" },
      4: { size: "sm", marginBottom: "$3" }
    }
  },
  defaultVariants: {
    level: 1
  }
});

const InternalStorySection = styled(VStack, {
  marginBottom: "$8",
  paddingHorizontal: "$4",
  marginHorizontal: "$-4",
  variants: {
    withBackground: {
      true: {
        backgroundColor: "$backgroundColor"
      }
    }
  }
});
function StorySection({
  title,
  children,
  level = 1,
  withBackground,
  ...props
}) {
  return /* @__PURE__ */ jsxs(InternalStorySection, { withBackground, ...props, children: [
    /* @__PURE__ */ jsx(StoryTitle, { level: level + 1, children: title }),
    children
  ] });
}
function SubSection({
  title,
  children,
  withBackground,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    InternalStorySection,
    {
      marginBottom: "$4",
      withBackground,
      ...props,
      children: [
        /* @__PURE__ */ jsx(StoryTitle, { level: 3, children: title }),
        children
      ]
    }
  );
}
function Story({ preview, children }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    preview && /* @__PURE__ */ jsx(StorySection, { title: "Preview", paddingBottom: "$12", children: preview }),
    children
  ] });
}
Story.Section = StorySection;
Story.SubSection = SubSection;

function StoryContainer({
  title,
  children
}) {
  return /* @__PURE__ */ jsxs(ScrollView, { theme: "light", background: "#fff", padding: "$4", children: [
    /* @__PURE__ */ jsx(StoryTitle, { level: 1, children: title }),
    children
  ] });
}

const StoryDecorator = (storyFn, { name, container }) => {
  if (container === false) return storyFn();
  return /* @__PURE__ */ jsx(StoryContainer, { title: name, children: storyFn() });
};

function StoryGridRow({
  children,
  breakpoint = "small",
  flexWrap
}) {
  return /* @__PURE__ */ jsx(
    View,
    {
      flexDirection: "column",
      ...{
        [`$${breakpoint}`]: {
          flexDirection: "row",
          marginVertical: "$-1",
          marginBottom: "$4",
          flexWrap: flexWrap ? "wrap" : void 0,
          gap: flexWrap ? "$xs" : void 0
        }
      },
      children: Children.map(children, (child) => /* @__PURE__ */ jsx(
        View,
        {
          paddingTop: "$2",
          paddingBottom: "$4",
          ...{
            [`$${breakpoint}`]: {
              flexGrow: 1,
              flexBasis: flexWrap ? void 0 : 0,
              paddingTop: 0,
              paddingBottom: 0,
              marginVertical: "$2"
            }
          },
          children: child
        }
      ))
    }
  );
}
function StoryGridCol({
  title,
  children,
  platform = "all"
}) {
  const isNative = Platform.OS === "ios" || Platform.OS === "android";
  if (Platform.OS === "web" && platform === "native") {
    return null;
  }
  if (isNative && platform === "web") {
    return null;
  }
  return title ? /* @__PURE__ */ jsxs(VStack, { children: [
    /* @__PURE__ */ jsx(StoryTitle, { level: 4, numberOfLines: 1, children: title }),
    children
  ] }) : children;
}
const StoryGrid = {
  Row: StoryGridRow,
  Col: StoryGridCol
};

function WithTamaguiConfig({
  render
}) {
  const config = useConfiguration();
  return render(config);
}

var BreakpointNameEnum = /* @__PURE__ */ ((BreakpointNameEnum2) => {
  BreakpointNameEnum2["BASE"] = "base";
  BreakpointNameEnum2["SMALL"] = "small";
  BreakpointNameEnum2["MEDIUM"] = "medium";
  BreakpointNameEnum2["LARGE"] = "large";
  BreakpointNameEnum2["WIDE"] = "wide";
  return BreakpointNameEnum2;
})(BreakpointNameEnum || {});

function useCurrentBreakpointName() {
  const media = useMedia();
  if (media.wide) return BreakpointNameEnum.WIDE;
  if (media.large) return BreakpointNameEnum.LARGE;
  if (media.medium) return BreakpointNameEnum.MEDIUM;
  if (media.small) return BreakpointNameEnum.SMALL;
  return BreakpointNameEnum.BASE;
}
function useCurrentBreakpointNameFiltered(names) {
  const media = useMedia();
  if (names.includes(BreakpointNameEnum.WIDE) && media.wide) {
    return BreakpointNameEnum.WIDE;
  }
  if (names.includes(BreakpointNameEnum.LARGE) && media.large) {
    return BreakpointNameEnum.LARGE;
  }
  if (names.includes(BreakpointNameEnum.MEDIUM) && media.medium) {
    return BreakpointNameEnum.MEDIUM;
  }
  if (names.includes(BreakpointNameEnum.SMALL) && media.small) {
    return BreakpointNameEnum.SMALL;
  }
  return BreakpointNameEnum.BASE;
}

function SwitchBreakpointsUsingDisplayNone({
  ...breakpoints
}) {
  const entries = Object.entries(breakpoints);
  return entries.map(([name, node], index) => {
    return /* @__PURE__ */ jsx(
      View,
      {
        display: name === "base" ? "flex" : "none",
        ...name === "base" ? void 0 : {
          display: "none",
          [`$${name}`]: { display: "flex" }
        },
        ...index + 1 in entries ? { [`$${entries[index + 1][0]}`]: { display: "none" } } : void 0,
        children: node
      },
      name
    );
  });
}
function SwitchBreakpointsUsingNull({
  children,
  ...breakpoints
}) {
  const currentBreakpointName = useCurrentBreakpointNameFiltered(
    Object.keys(breakpoints)
  );
  return breakpoints[currentBreakpointName] ?? null;
}

function AlouetteProvider({
  children,
  tamaguiConfig
}) {
  return /* @__PURE__ */ jsx(TamaguiProvider, { config: tamaguiConfig, defaultTheme: "light", children });
}

const AlouetteDecorator = (storyFn, context) => /* @__PURE__ */ jsx(AlouetteProvider, { tamaguiConfig: context.parameters.tamaguiConfig, children: storyFn(context) });

export { AlouetteDecorator, AlouetteProvider, Button, Frame, HStack, Icon, IconButton, InputText, Message, Pressable, ScrollView, Stack, Story, StoryContainer, StoryDecorator, StoryGrid, StoryTitle, SwitchBreakpointsUsingDisplayNone, SwitchBreakpointsUsingNull, Typography, TypographyParagraph, TypographyParagraphWithContext, TypographyWithContext, VStack, WithTamaguiConfig, useCurrentBreakpointName };
//# sourceMappingURL=index-node18.mjs.map
