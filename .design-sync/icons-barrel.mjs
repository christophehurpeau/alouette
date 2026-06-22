// Stub barrel for the converter's [ICON_PKG] auto-include.
// alouette-icons exposes only `./phosphor-icons/*` subpaths (no root export),
// so `export * from "alouette-icons"` cannot resolve. The main dist already
// bundles the specific icon subpaths it uses inline, so no global icon merge
// is needed for the current (Inputs) sync scope. Revisit if/when
// icon-consuming components are brought into scope.
export {};
