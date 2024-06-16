'use strict';

const jsxRuntime = require('react/jsx-runtime');
const core = require('@tamagui/core');
const react = require('react');
require('@phosphor-icons/core/assets/regular/address-book.svg');
require('@phosphor-icons/core/assets/fill/address-book-fill.svg');
require('@phosphor-icons/core/assets/regular/air-traffic-control.svg');
require('@phosphor-icons/core/assets/fill/air-traffic-control-fill.svg');
require('@phosphor-icons/core/assets/regular/airplane.svg');
require('@phosphor-icons/core/assets/fill/airplane-fill.svg');
require('@phosphor-icons/core/assets/regular/airplane-in-flight.svg');
require('@phosphor-icons/core/assets/fill/airplane-in-flight-fill.svg');
require('@phosphor-icons/core/assets/regular/airplane-landing.svg');
require('@phosphor-icons/core/assets/fill/airplane-landing-fill.svg');
require('@phosphor-icons/core/assets/regular/airplane-takeoff.svg');
require('@phosphor-icons/core/assets/fill/airplane-takeoff-fill.svg');
require('@phosphor-icons/core/assets/regular/airplane-tilt.svg');
require('@phosphor-icons/core/assets/fill/airplane-tilt-fill.svg');
require('@phosphor-icons/core/assets/regular/airplay.svg');
require('@phosphor-icons/core/assets/fill/airplay-fill.svg');
require('@phosphor-icons/core/assets/regular/alarm.svg');
require('@phosphor-icons/core/assets/fill/alarm-fill.svg');
require('@phosphor-icons/core/assets/regular/alien.svg');
require('@phosphor-icons/core/assets/fill/alien-fill.svg');
require('@phosphor-icons/core/assets/regular/align-bottom.svg');
require('@phosphor-icons/core/assets/fill/align-bottom-fill.svg');
require('@phosphor-icons/core/assets/regular/align-bottom-simple.svg');
require('@phosphor-icons/core/assets/fill/align-bottom-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/align-center-horizontal.svg');
require('@phosphor-icons/core/assets/fill/align-center-horizontal-fill.svg');
require('@phosphor-icons/core/assets/regular/align-center-horizontal-simple.svg');
require('@phosphor-icons/core/assets/fill/align-center-horizontal-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/align-center-vertical.svg');
require('@phosphor-icons/core/assets/fill/align-center-vertical-fill.svg');
require('@phosphor-icons/core/assets/regular/align-center-vertical-simple.svg');
require('@phosphor-icons/core/assets/fill/align-center-vertical-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/align-left.svg');
require('@phosphor-icons/core/assets/fill/align-left-fill.svg');
require('@phosphor-icons/core/assets/regular/align-left-simple.svg');
require('@phosphor-icons/core/assets/fill/align-left-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/align-right.svg');
require('@phosphor-icons/core/assets/fill/align-right-fill.svg');
require('@phosphor-icons/core/assets/regular/align-right-simple.svg');
require('@phosphor-icons/core/assets/fill/align-right-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/align-top.svg');
require('@phosphor-icons/core/assets/fill/align-top-fill.svg');
require('@phosphor-icons/core/assets/regular/align-top-simple.svg');
require('@phosphor-icons/core/assets/fill/align-top-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/amazon-logo.svg');
require('@phosphor-icons/core/assets/fill/amazon-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/anchor.svg');
require('@phosphor-icons/core/assets/fill/anchor-fill.svg');
require('@phosphor-icons/core/assets/regular/anchor-simple.svg');
require('@phosphor-icons/core/assets/fill/anchor-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/android-logo.svg');
require('@phosphor-icons/core/assets/fill/android-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/angular-logo.svg');
require('@phosphor-icons/core/assets/fill/angular-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/aperture.svg');
require('@phosphor-icons/core/assets/fill/aperture-fill.svg');
require('@phosphor-icons/core/assets/regular/app-store-logo.svg');
require('@phosphor-icons/core/assets/fill/app-store-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/app-window.svg');
require('@phosphor-icons/core/assets/fill/app-window-fill.svg');
require('@phosphor-icons/core/assets/regular/apple-logo.svg');
require('@phosphor-icons/core/assets/fill/apple-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/apple-podcasts-logo.svg');
require('@phosphor-icons/core/assets/fill/apple-podcasts-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/archive.svg');
require('@phosphor-icons/core/assets/fill/archive-fill.svg');
require('@phosphor-icons/core/assets/regular/archive-box.svg');
require('@phosphor-icons/core/assets/fill/archive-box-fill.svg');
require('@phosphor-icons/core/assets/regular/archive-tray.svg');
require('@phosphor-icons/core/assets/fill/archive-tray-fill.svg');
require('@phosphor-icons/core/assets/regular/armchair.svg');
require('@phosphor-icons/core/assets/fill/armchair-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-arc-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-arc-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-arc-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-arc-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-bend-double-up-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-bend-double-up-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-bend-double-up-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-bend-double-up-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-bend-down-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-bend-down-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-bend-down-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-bend-down-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-bend-left-down.svg');
require('@phosphor-icons/core/assets/fill/arrow-bend-left-down-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-bend-left-up.svg');
require('@phosphor-icons/core/assets/fill/arrow-bend-left-up-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-bend-right-down.svg');
require('@phosphor-icons/core/assets/fill/arrow-bend-right-down-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-bend-right-up.svg');
require('@phosphor-icons/core/assets/fill/arrow-bend-right-up-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-bend-up-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-bend-up-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-bend-up-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-bend-up-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-circle-down.svg');
require('@phosphor-icons/core/assets/fill/arrow-circle-down-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-circle-down-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-circle-down-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-circle-down-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-circle-down-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-circle-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-circle-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-circle-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-circle-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-circle-up.svg');
require('@phosphor-icons/core/assets/fill/arrow-circle-up-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-circle-up-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-circle-up-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-circle-up-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-circle-up-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-clockwise.svg');
require('@phosphor-icons/core/assets/fill/arrow-clockwise-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-counter-clockwise.svg');
require('@phosphor-icons/core/assets/fill/arrow-counter-clockwise-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-down.svg');
require('@phosphor-icons/core/assets/fill/arrow-down-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-down-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-down-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-down-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-down-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-elbow-down-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-elbow-down-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-elbow-down-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-elbow-down-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-elbow-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-elbow-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-elbow-left-down.svg');
require('@phosphor-icons/core/assets/fill/arrow-elbow-left-down-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-elbow-left-up.svg');
require('@phosphor-icons/core/assets/fill/arrow-elbow-left-up-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-elbow-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-elbow-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-elbow-right-down.svg');
require('@phosphor-icons/core/assets/fill/arrow-elbow-right-down-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-elbow-right-up.svg');
require('@phosphor-icons/core/assets/fill/arrow-elbow-right-up-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-elbow-up-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-elbow-up-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-elbow-up-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-elbow-up-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-fat-down.svg');
require('@phosphor-icons/core/assets/fill/arrow-fat-down-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-fat-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-fat-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-fat-line-down.svg');
require('@phosphor-icons/core/assets/fill/arrow-fat-line-down-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-fat-line-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-fat-line-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-fat-line-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-fat-line-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-fat-line-up.svg');
require('@phosphor-icons/core/assets/fill/arrow-fat-line-up-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-fat-lines-down.svg');
require('@phosphor-icons/core/assets/fill/arrow-fat-lines-down-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-fat-lines-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-fat-lines-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-fat-lines-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-fat-lines-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-fat-lines-up.svg');
require('@phosphor-icons/core/assets/fill/arrow-fat-lines-up-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-fat-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-fat-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-fat-up.svg');
require('@phosphor-icons/core/assets/fill/arrow-fat-up-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-line-down.svg');
require('@phosphor-icons/core/assets/fill/arrow-line-down-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-line-down-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-line-down-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-line-down-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-line-down-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-line-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-line-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-line-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-line-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-line-up.svg');
require('@phosphor-icons/core/assets/fill/arrow-line-up-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-line-up-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-line-up-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-line-up-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-line-up-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-square-down.svg');
require('@phosphor-icons/core/assets/fill/arrow-square-down-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-square-down-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-square-down-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-square-down-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-square-down-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-square-in.svg');
require('@phosphor-icons/core/assets/fill/arrow-square-in-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-square-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-square-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-square-out.svg');
require('@phosphor-icons/core/assets/fill/arrow-square-out-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-square-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-square-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-square-up.svg');
require('@phosphor-icons/core/assets/fill/arrow-square-up-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-square-up-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-square-up-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-square-up-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-square-up-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-u-down-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-u-down-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-u-down-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-u-down-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-u-left-down.svg');
require('@phosphor-icons/core/assets/fill/arrow-u-left-down-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-u-left-up.svg');
require('@phosphor-icons/core/assets/fill/arrow-u-left-up-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-u-right-down.svg');
require('@phosphor-icons/core/assets/fill/arrow-u-right-down-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-u-right-up.svg');
require('@phosphor-icons/core/assets/fill/arrow-u-right-up-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-u-up-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-u-up-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-u-up-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-u-up-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-up.svg');
require('@phosphor-icons/core/assets/fill/arrow-up-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-up-left.svg');
require('@phosphor-icons/core/assets/fill/arrow-up-left-fill.svg');
require('@phosphor-icons/core/assets/regular/arrow-up-right.svg');
require('@phosphor-icons/core/assets/fill/arrow-up-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-clockwise.svg');
require('@phosphor-icons/core/assets/fill/arrows-clockwise-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-counter-clockwise.svg');
require('@phosphor-icons/core/assets/fill/arrows-counter-clockwise-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-down-up.svg');
require('@phosphor-icons/core/assets/fill/arrows-down-up-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-horizontal.svg');
require('@phosphor-icons/core/assets/fill/arrows-horizontal-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-in.svg');
require('@phosphor-icons/core/assets/fill/arrows-in-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-in-cardinal.svg');
require('@phosphor-icons/core/assets/fill/arrows-in-cardinal-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-in-line-horizontal.svg');
require('@phosphor-icons/core/assets/fill/arrows-in-line-horizontal-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-in-line-vertical.svg');
require('@phosphor-icons/core/assets/fill/arrows-in-line-vertical-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-in-simple.svg');
require('@phosphor-icons/core/assets/fill/arrows-in-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-left-right.svg');
require('@phosphor-icons/core/assets/fill/arrows-left-right-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-merge.svg');
require('@phosphor-icons/core/assets/fill/arrows-merge-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-out.svg');
require('@phosphor-icons/core/assets/fill/arrows-out-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-out-cardinal.svg');
require('@phosphor-icons/core/assets/fill/arrows-out-cardinal-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-out-line-horizontal.svg');
require('@phosphor-icons/core/assets/fill/arrows-out-line-horizontal-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-out-line-vertical.svg');
require('@phosphor-icons/core/assets/fill/arrows-out-line-vertical-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-out-simple.svg');
require('@phosphor-icons/core/assets/fill/arrows-out-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-split.svg');
require('@phosphor-icons/core/assets/fill/arrows-split-fill.svg');
require('@phosphor-icons/core/assets/regular/arrows-vertical.svg');
require('@phosphor-icons/core/assets/fill/arrows-vertical-fill.svg');
require('@phosphor-icons/core/assets/regular/article.svg');
require('@phosphor-icons/core/assets/fill/article-fill.svg');
require('@phosphor-icons/core/assets/regular/article-medium.svg');
require('@phosphor-icons/core/assets/fill/article-medium-fill.svg');
require('@phosphor-icons/core/assets/regular/article-ny-times.svg');
require('@phosphor-icons/core/assets/fill/article-ny-times-fill.svg');
require('@phosphor-icons/core/assets/regular/asterisk.svg');
require('@phosphor-icons/core/assets/fill/asterisk-fill.svg');
require('@phosphor-icons/core/assets/regular/asterisk-simple.svg');
require('@phosphor-icons/core/assets/fill/asterisk-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/at.svg');
require('@phosphor-icons/core/assets/fill/at-fill.svg');
require('@phosphor-icons/core/assets/regular/atom.svg');
require('@phosphor-icons/core/assets/fill/atom-fill.svg');
require('@phosphor-icons/core/assets/regular/baby.svg');
require('@phosphor-icons/core/assets/fill/baby-fill.svg');
require('@phosphor-icons/core/assets/regular/backpack.svg');
require('@phosphor-icons/core/assets/fill/backpack-fill.svg');
require('@phosphor-icons/core/assets/regular/backspace.svg');
require('@phosphor-icons/core/assets/fill/backspace-fill.svg');
require('@phosphor-icons/core/assets/regular/bag.svg');
require('@phosphor-icons/core/assets/fill/bag-fill.svg');
require('@phosphor-icons/core/assets/regular/bag-simple.svg');
require('@phosphor-icons/core/assets/fill/bag-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/balloon.svg');
require('@phosphor-icons/core/assets/fill/balloon-fill.svg');
require('@phosphor-icons/core/assets/regular/bandaids.svg');
require('@phosphor-icons/core/assets/fill/bandaids-fill.svg');
require('@phosphor-icons/core/assets/regular/bank.svg');
require('@phosphor-icons/core/assets/fill/bank-fill.svg');
require('@phosphor-icons/core/assets/regular/barbell.svg');
require('@phosphor-icons/core/assets/fill/barbell-fill.svg');
require('@phosphor-icons/core/assets/regular/barcode.svg');
require('@phosphor-icons/core/assets/fill/barcode-fill.svg');
require('@phosphor-icons/core/assets/regular/barricade.svg');
require('@phosphor-icons/core/assets/fill/barricade-fill.svg');
require('@phosphor-icons/core/assets/regular/baseball.svg');
require('@phosphor-icons/core/assets/fill/baseball-fill.svg');
require('@phosphor-icons/core/assets/regular/baseball-cap.svg');
require('@phosphor-icons/core/assets/fill/baseball-cap-fill.svg');
require('@phosphor-icons/core/assets/regular/basket.svg');
require('@phosphor-icons/core/assets/fill/basket-fill.svg');
require('@phosphor-icons/core/assets/regular/basketball.svg');
require('@phosphor-icons/core/assets/fill/basketball-fill.svg');
require('@phosphor-icons/core/assets/regular/bathtub.svg');
require('@phosphor-icons/core/assets/fill/bathtub-fill.svg');
require('@phosphor-icons/core/assets/regular/battery-charging.svg');
require('@phosphor-icons/core/assets/fill/battery-charging-fill.svg');
require('@phosphor-icons/core/assets/regular/battery-charging-vertical.svg');
require('@phosphor-icons/core/assets/fill/battery-charging-vertical-fill.svg');
require('@phosphor-icons/core/assets/regular/battery-empty.svg');
require('@phosphor-icons/core/assets/fill/battery-empty-fill.svg');
require('@phosphor-icons/core/assets/regular/battery-full.svg');
require('@phosphor-icons/core/assets/fill/battery-full-fill.svg');
require('@phosphor-icons/core/assets/regular/battery-high.svg');
require('@phosphor-icons/core/assets/fill/battery-high-fill.svg');
require('@phosphor-icons/core/assets/regular/battery-low.svg');
require('@phosphor-icons/core/assets/fill/battery-low-fill.svg');
require('@phosphor-icons/core/assets/regular/battery-medium.svg');
require('@phosphor-icons/core/assets/fill/battery-medium-fill.svg');
require('@phosphor-icons/core/assets/regular/battery-plus.svg');
require('@phosphor-icons/core/assets/fill/battery-plus-fill.svg');
require('@phosphor-icons/core/assets/regular/battery-plus-vertical.svg');
require('@phosphor-icons/core/assets/fill/battery-plus-vertical-fill.svg');
require('@phosphor-icons/core/assets/regular/battery-vertical-empty.svg');
require('@phosphor-icons/core/assets/fill/battery-vertical-empty-fill.svg');
require('@phosphor-icons/core/assets/regular/battery-vertical-full.svg');
require('@phosphor-icons/core/assets/fill/battery-vertical-full-fill.svg');
require('@phosphor-icons/core/assets/regular/battery-vertical-high.svg');
require('@phosphor-icons/core/assets/fill/battery-vertical-high-fill.svg');
require('@phosphor-icons/core/assets/regular/battery-vertical-low.svg');
require('@phosphor-icons/core/assets/fill/battery-vertical-low-fill.svg');
require('@phosphor-icons/core/assets/regular/battery-vertical-medium.svg');
require('@phosphor-icons/core/assets/fill/battery-vertical-medium-fill.svg');
require('@phosphor-icons/core/assets/regular/battery-warning.svg');
require('@phosphor-icons/core/assets/fill/battery-warning-fill.svg');
require('@phosphor-icons/core/assets/regular/battery-warning-vertical.svg');
require('@phosphor-icons/core/assets/fill/battery-warning-vertical-fill.svg');
require('@phosphor-icons/core/assets/regular/bed.svg');
require('@phosphor-icons/core/assets/fill/bed-fill.svg');
require('@phosphor-icons/core/assets/regular/beer-bottle.svg');
require('@phosphor-icons/core/assets/fill/beer-bottle-fill.svg');
require('@phosphor-icons/core/assets/regular/beer-stein.svg');
require('@phosphor-icons/core/assets/fill/beer-stein-fill.svg');
require('@phosphor-icons/core/assets/regular/behance-logo.svg');
require('@phosphor-icons/core/assets/fill/behance-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/bell.svg');
require('@phosphor-icons/core/assets/fill/bell-fill.svg');
require('@phosphor-icons/core/assets/regular/bell-ringing.svg');
require('@phosphor-icons/core/assets/fill/bell-ringing-fill.svg');
require('@phosphor-icons/core/assets/regular/bell-simple.svg');
require('@phosphor-icons/core/assets/fill/bell-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/bell-simple-ringing.svg');
require('@phosphor-icons/core/assets/fill/bell-simple-ringing-fill.svg');
require('@phosphor-icons/core/assets/regular/bell-simple-slash.svg');
require('@phosphor-icons/core/assets/fill/bell-simple-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/bell-simple-z.svg');
require('@phosphor-icons/core/assets/fill/bell-simple-z-fill.svg');
require('@phosphor-icons/core/assets/regular/bell-slash.svg');
require('@phosphor-icons/core/assets/fill/bell-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/bell-z.svg');
require('@phosphor-icons/core/assets/fill/bell-z-fill.svg');
require('@phosphor-icons/core/assets/regular/bezier-curve.svg');
require('@phosphor-icons/core/assets/fill/bezier-curve-fill.svg');
require('@phosphor-icons/core/assets/regular/bicycle.svg');
require('@phosphor-icons/core/assets/fill/bicycle-fill.svg');
require('@phosphor-icons/core/assets/regular/binoculars.svg');
require('@phosphor-icons/core/assets/fill/binoculars-fill.svg');
require('@phosphor-icons/core/assets/regular/bird.svg');
require('@phosphor-icons/core/assets/fill/bird-fill.svg');
require('@phosphor-icons/core/assets/regular/bluetooth.svg');
require('@phosphor-icons/core/assets/fill/bluetooth-fill.svg');
require('@phosphor-icons/core/assets/regular/bluetooth-connected.svg');
require('@phosphor-icons/core/assets/fill/bluetooth-connected-fill.svg');
require('@phosphor-icons/core/assets/regular/bluetooth-slash.svg');
require('@phosphor-icons/core/assets/fill/bluetooth-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/bluetooth-x.svg');
require('@phosphor-icons/core/assets/fill/bluetooth-x-fill.svg');
require('@phosphor-icons/core/assets/regular/boat.svg');
require('@phosphor-icons/core/assets/fill/boat-fill.svg');
require('@phosphor-icons/core/assets/regular/bone.svg');
require('@phosphor-icons/core/assets/fill/bone-fill.svg');
require('@phosphor-icons/core/assets/regular/book.svg');
require('@phosphor-icons/core/assets/fill/book-fill.svg');
require('@phosphor-icons/core/assets/regular/book-bookmark.svg');
require('@phosphor-icons/core/assets/fill/book-bookmark-fill.svg');
require('@phosphor-icons/core/assets/regular/book-open.svg');
require('@phosphor-icons/core/assets/fill/book-open-fill.svg');
require('@phosphor-icons/core/assets/regular/book-open-text.svg');
require('@phosphor-icons/core/assets/fill/book-open-text-fill.svg');
require('@phosphor-icons/core/assets/regular/bookmark.svg');
require('@phosphor-icons/core/assets/fill/bookmark-fill.svg');
require('@phosphor-icons/core/assets/regular/bookmark-simple.svg');
require('@phosphor-icons/core/assets/fill/bookmark-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/bookmarks.svg');
require('@phosphor-icons/core/assets/fill/bookmarks-fill.svg');
require('@phosphor-icons/core/assets/regular/bookmarks-simple.svg');
require('@phosphor-icons/core/assets/fill/bookmarks-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/books.svg');
require('@phosphor-icons/core/assets/fill/books-fill.svg');
require('@phosphor-icons/core/assets/regular/boot.svg');
require('@phosphor-icons/core/assets/fill/boot-fill.svg');
require('@phosphor-icons/core/assets/regular/bounding-box.svg');
require('@phosphor-icons/core/assets/fill/bounding-box-fill.svg');
require('@phosphor-icons/core/assets/regular/bowl-food.svg');
require('@phosphor-icons/core/assets/fill/bowl-food-fill.svg');
require('@phosphor-icons/core/assets/regular/brackets-angle.svg');
require('@phosphor-icons/core/assets/fill/brackets-angle-fill.svg');
require('@phosphor-icons/core/assets/regular/brackets-curly.svg');
require('@phosphor-icons/core/assets/fill/brackets-curly-fill.svg');
require('@phosphor-icons/core/assets/regular/brackets-round.svg');
require('@phosphor-icons/core/assets/fill/brackets-round-fill.svg');
require('@phosphor-icons/core/assets/regular/brackets-square.svg');
require('@phosphor-icons/core/assets/fill/brackets-square-fill.svg');
require('@phosphor-icons/core/assets/regular/brain.svg');
require('@phosphor-icons/core/assets/fill/brain-fill.svg');
require('@phosphor-icons/core/assets/regular/brandy.svg');
require('@phosphor-icons/core/assets/fill/brandy-fill.svg');
require('@phosphor-icons/core/assets/regular/bridge.svg');
require('@phosphor-icons/core/assets/fill/bridge-fill.svg');
require('@phosphor-icons/core/assets/regular/briefcase.svg');
require('@phosphor-icons/core/assets/fill/briefcase-fill.svg');
require('@phosphor-icons/core/assets/regular/briefcase-metal.svg');
require('@phosphor-icons/core/assets/fill/briefcase-metal-fill.svg');
require('@phosphor-icons/core/assets/regular/broadcast.svg');
require('@phosphor-icons/core/assets/fill/broadcast-fill.svg');
require('@phosphor-icons/core/assets/regular/broom.svg');
require('@phosphor-icons/core/assets/fill/broom-fill.svg');
require('@phosphor-icons/core/assets/regular/browser.svg');
require('@phosphor-icons/core/assets/fill/browser-fill.svg');
require('@phosphor-icons/core/assets/regular/browsers.svg');
require('@phosphor-icons/core/assets/fill/browsers-fill.svg');
require('@phosphor-icons/core/assets/regular/bug.svg');
require('@phosphor-icons/core/assets/fill/bug-fill.svg');
require('@phosphor-icons/core/assets/regular/bug-beetle.svg');
require('@phosphor-icons/core/assets/fill/bug-beetle-fill.svg');
require('@phosphor-icons/core/assets/regular/bug-droid.svg');
require('@phosphor-icons/core/assets/fill/bug-droid-fill.svg');
require('@phosphor-icons/core/assets/regular/buildings.svg');
require('@phosphor-icons/core/assets/fill/buildings-fill.svg');
require('@phosphor-icons/core/assets/regular/bus.svg');
require('@phosphor-icons/core/assets/fill/bus-fill.svg');
require('@phosphor-icons/core/assets/regular/butterfly.svg');
require('@phosphor-icons/core/assets/fill/butterfly-fill.svg');
require('@phosphor-icons/core/assets/regular/cactus.svg');
require('@phosphor-icons/core/assets/fill/cactus-fill.svg');
require('@phosphor-icons/core/assets/regular/cake.svg');
require('@phosphor-icons/core/assets/fill/cake-fill.svg');
require('@phosphor-icons/core/assets/regular/calculator.svg');
require('@phosphor-icons/core/assets/fill/calculator-fill.svg');
require('@phosphor-icons/core/assets/regular/calendar.svg');
require('@phosphor-icons/core/assets/fill/calendar-fill.svg');
require('@phosphor-icons/core/assets/regular/calendar-blank.svg');
require('@phosphor-icons/core/assets/fill/calendar-blank-fill.svg');
require('@phosphor-icons/core/assets/regular/calendar-check.svg');
require('@phosphor-icons/core/assets/fill/calendar-check-fill.svg');
require('@phosphor-icons/core/assets/regular/calendar-plus.svg');
require('@phosphor-icons/core/assets/fill/calendar-plus-fill.svg');
require('@phosphor-icons/core/assets/regular/calendar-x.svg');
require('@phosphor-icons/core/assets/fill/calendar-x-fill.svg');
require('@phosphor-icons/core/assets/regular/call-bell.svg');
require('@phosphor-icons/core/assets/fill/call-bell-fill.svg');
require('@phosphor-icons/core/assets/regular/camera.svg');
require('@phosphor-icons/core/assets/fill/camera-fill.svg');
require('@phosphor-icons/core/assets/regular/camera-plus.svg');
require('@phosphor-icons/core/assets/fill/camera-plus-fill.svg');
require('@phosphor-icons/core/assets/regular/camera-rotate.svg');
require('@phosphor-icons/core/assets/fill/camera-rotate-fill.svg');
require('@phosphor-icons/core/assets/regular/camera-slash.svg');
require('@phosphor-icons/core/assets/fill/camera-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/campfire.svg');
require('@phosphor-icons/core/assets/fill/campfire-fill.svg');
require('@phosphor-icons/core/assets/regular/car.svg');
require('@phosphor-icons/core/assets/fill/car-fill.svg');
require('@phosphor-icons/core/assets/regular/car-profile.svg');
require('@phosphor-icons/core/assets/fill/car-profile-fill.svg');
require('@phosphor-icons/core/assets/regular/car-simple.svg');
require('@phosphor-icons/core/assets/fill/car-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/cardholder.svg');
require('@phosphor-icons/core/assets/fill/cardholder-fill.svg');
require('@phosphor-icons/core/assets/regular/cards.svg');
require('@phosphor-icons/core/assets/fill/cards-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-circle-double-down.svg');
require('@phosphor-icons/core/assets/fill/caret-circle-double-down-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-circle-double-left.svg');
require('@phosphor-icons/core/assets/fill/caret-circle-double-left-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-circle-double-right.svg');
require('@phosphor-icons/core/assets/fill/caret-circle-double-right-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-circle-double-up.svg');
require('@phosphor-icons/core/assets/fill/caret-circle-double-up-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-circle-down.svg');
require('@phosphor-icons/core/assets/fill/caret-circle-down-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-circle-left.svg');
require('@phosphor-icons/core/assets/fill/caret-circle-left-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-circle-right.svg');
require('@phosphor-icons/core/assets/fill/caret-circle-right-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-circle-up.svg');
require('@phosphor-icons/core/assets/fill/caret-circle-up-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-circle-up-down.svg');
require('@phosphor-icons/core/assets/fill/caret-circle-up-down-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-double-down.svg');
require('@phosphor-icons/core/assets/fill/caret-double-down-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-double-left.svg');
require('@phosphor-icons/core/assets/fill/caret-double-left-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-double-right.svg');
require('@phosphor-icons/core/assets/fill/caret-double-right-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-double-up.svg');
require('@phosphor-icons/core/assets/fill/caret-double-up-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-down.svg');
require('@phosphor-icons/core/assets/fill/caret-down-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-left.svg');
require('@phosphor-icons/core/assets/fill/caret-left-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-right.svg');
require('@phosphor-icons/core/assets/fill/caret-right-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-up.svg');
require('@phosphor-icons/core/assets/fill/caret-up-fill.svg');
require('@phosphor-icons/core/assets/regular/caret-up-down.svg');
require('@phosphor-icons/core/assets/fill/caret-up-down-fill.svg');
require('@phosphor-icons/core/assets/regular/carrot.svg');
require('@phosphor-icons/core/assets/fill/carrot-fill.svg');
require('@phosphor-icons/core/assets/regular/cassette-tape.svg');
require('@phosphor-icons/core/assets/fill/cassette-tape-fill.svg');
require('@phosphor-icons/core/assets/regular/castle-turret.svg');
require('@phosphor-icons/core/assets/fill/castle-turret-fill.svg');
require('@phosphor-icons/core/assets/regular/cat.svg');
require('@phosphor-icons/core/assets/fill/cat-fill.svg');
require('@phosphor-icons/core/assets/regular/cell-signal-full.svg');
require('@phosphor-icons/core/assets/fill/cell-signal-full-fill.svg');
require('@phosphor-icons/core/assets/regular/cell-signal-high.svg');
require('@phosphor-icons/core/assets/fill/cell-signal-high-fill.svg');
require('@phosphor-icons/core/assets/regular/cell-signal-low.svg');
require('@phosphor-icons/core/assets/fill/cell-signal-low-fill.svg');
require('@phosphor-icons/core/assets/regular/cell-signal-medium.svg');
require('@phosphor-icons/core/assets/fill/cell-signal-medium-fill.svg');
require('@phosphor-icons/core/assets/regular/cell-signal-none.svg');
require('@phosphor-icons/core/assets/fill/cell-signal-none-fill.svg');
require('@phosphor-icons/core/assets/regular/cell-signal-slash.svg');
require('@phosphor-icons/core/assets/fill/cell-signal-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/cell-signal-x.svg');
require('@phosphor-icons/core/assets/fill/cell-signal-x-fill.svg');
require('@phosphor-icons/core/assets/regular/certificate.svg');
require('@phosphor-icons/core/assets/fill/certificate-fill.svg');
require('@phosphor-icons/core/assets/regular/chair.svg');
require('@phosphor-icons/core/assets/fill/chair-fill.svg');
require('@phosphor-icons/core/assets/regular/chalkboard.svg');
require('@phosphor-icons/core/assets/fill/chalkboard-fill.svg');
require('@phosphor-icons/core/assets/regular/chalkboard-simple.svg');
require('@phosphor-icons/core/assets/fill/chalkboard-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/chalkboard-teacher.svg');
require('@phosphor-icons/core/assets/fill/chalkboard-teacher-fill.svg');
require('@phosphor-icons/core/assets/regular/champagne.svg');
require('@phosphor-icons/core/assets/fill/champagne-fill.svg');
require('@phosphor-icons/core/assets/regular/charging-station.svg');
require('@phosphor-icons/core/assets/fill/charging-station-fill.svg');
require('@phosphor-icons/core/assets/regular/chart-bar.svg');
require('@phosphor-icons/core/assets/fill/chart-bar-fill.svg');
require('@phosphor-icons/core/assets/regular/chart-bar-horizontal.svg');
require('@phosphor-icons/core/assets/fill/chart-bar-horizontal-fill.svg');
require('@phosphor-icons/core/assets/regular/chart-donut.svg');
require('@phosphor-icons/core/assets/fill/chart-donut-fill.svg');
require('@phosphor-icons/core/assets/regular/chart-line.svg');
require('@phosphor-icons/core/assets/fill/chart-line-fill.svg');
require('@phosphor-icons/core/assets/regular/chart-line-down.svg');
require('@phosphor-icons/core/assets/fill/chart-line-down-fill.svg');
require('@phosphor-icons/core/assets/regular/chart-line-up.svg');
require('@phosphor-icons/core/assets/fill/chart-line-up-fill.svg');
require('@phosphor-icons/core/assets/regular/chart-pie.svg');
require('@phosphor-icons/core/assets/fill/chart-pie-fill.svg');
require('@phosphor-icons/core/assets/regular/chart-pie-slice.svg');
require('@phosphor-icons/core/assets/fill/chart-pie-slice-fill.svg');
require('@phosphor-icons/core/assets/regular/chart-polar.svg');
require('@phosphor-icons/core/assets/fill/chart-polar-fill.svg');
require('@phosphor-icons/core/assets/regular/chart-scatter.svg');
require('@phosphor-icons/core/assets/fill/chart-scatter-fill.svg');
require('@phosphor-icons/core/assets/regular/chat.svg');
require('@phosphor-icons/core/assets/fill/chat-fill.svg');
require('@phosphor-icons/core/assets/regular/chat-centered.svg');
require('@phosphor-icons/core/assets/fill/chat-centered-fill.svg');
require('@phosphor-icons/core/assets/regular/chat-centered-dots.svg');
require('@phosphor-icons/core/assets/fill/chat-centered-dots-fill.svg');
require('@phosphor-icons/core/assets/regular/chat-centered-text.svg');
require('@phosphor-icons/core/assets/fill/chat-centered-text-fill.svg');
require('@phosphor-icons/core/assets/regular/chat-circle.svg');
require('@phosphor-icons/core/assets/fill/chat-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/chat-circle-dots.svg');
require('@phosphor-icons/core/assets/fill/chat-circle-dots-fill.svg');
require('@phosphor-icons/core/assets/regular/chat-circle-text.svg');
require('@phosphor-icons/core/assets/fill/chat-circle-text-fill.svg');
require('@phosphor-icons/core/assets/regular/chat-dots.svg');
require('@phosphor-icons/core/assets/fill/chat-dots-fill.svg');
require('@phosphor-icons/core/assets/regular/chat-teardrop.svg');
require('@phosphor-icons/core/assets/fill/chat-teardrop-fill.svg');
require('@phosphor-icons/core/assets/regular/chat-teardrop-dots.svg');
require('@phosphor-icons/core/assets/fill/chat-teardrop-dots-fill.svg');
require('@phosphor-icons/core/assets/regular/chat-teardrop-text.svg');
require('@phosphor-icons/core/assets/fill/chat-teardrop-text-fill.svg');
require('@phosphor-icons/core/assets/regular/chat-text.svg');
require('@phosphor-icons/core/assets/fill/chat-text-fill.svg');
require('@phosphor-icons/core/assets/regular/chats.svg');
require('@phosphor-icons/core/assets/fill/chats-fill.svg');
require('@phosphor-icons/core/assets/regular/chats-circle.svg');
require('@phosphor-icons/core/assets/fill/chats-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/chats-teardrop.svg');
require('@phosphor-icons/core/assets/fill/chats-teardrop-fill.svg');
const check_svg = require('@phosphor-icons/core/assets/regular/check.svg');
require('@phosphor-icons/core/assets/fill/check-fill.svg');
require('@phosphor-icons/core/assets/regular/check-circle.svg');
require('@phosphor-icons/core/assets/fill/check-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/check-fat.svg');
require('@phosphor-icons/core/assets/fill/check-fat-fill.svg');
require('@phosphor-icons/core/assets/regular/check-square.svg');
require('@phosphor-icons/core/assets/fill/check-square-fill.svg');
require('@phosphor-icons/core/assets/regular/check-square-offset.svg');
require('@phosphor-icons/core/assets/fill/check-square-offset-fill.svg');
require('@phosphor-icons/core/assets/regular/checks.svg');
require('@phosphor-icons/core/assets/fill/checks-fill.svg');
require('@phosphor-icons/core/assets/regular/church.svg');
require('@phosphor-icons/core/assets/fill/church-fill.svg');
require('@phosphor-icons/core/assets/regular/circle.svg');
require('@phosphor-icons/core/assets/fill/circle-fill.svg');
require('@phosphor-icons/core/assets/regular/circle-dashed.svg');
require('@phosphor-icons/core/assets/fill/circle-dashed-fill.svg');
require('@phosphor-icons/core/assets/regular/circle-half.svg');
require('@phosphor-icons/core/assets/fill/circle-half-fill.svg');
require('@phosphor-icons/core/assets/regular/circle-half-tilt.svg');
require('@phosphor-icons/core/assets/fill/circle-half-tilt-fill.svg');
require('@phosphor-icons/core/assets/regular/circle-notch.svg');
require('@phosphor-icons/core/assets/fill/circle-notch-fill.svg');
require('@phosphor-icons/core/assets/regular/circles-four.svg');
require('@phosphor-icons/core/assets/fill/circles-four-fill.svg');
require('@phosphor-icons/core/assets/regular/circles-three.svg');
require('@phosphor-icons/core/assets/fill/circles-three-fill.svg');
require('@phosphor-icons/core/assets/regular/circles-three-plus.svg');
require('@phosphor-icons/core/assets/fill/circles-three-plus-fill.svg');
require('@phosphor-icons/core/assets/regular/circuitry.svg');
require('@phosphor-icons/core/assets/fill/circuitry-fill.svg');
require('@phosphor-icons/core/assets/regular/clipboard.svg');
require('@phosphor-icons/core/assets/fill/clipboard-fill.svg');
require('@phosphor-icons/core/assets/regular/clipboard-text.svg');
require('@phosphor-icons/core/assets/fill/clipboard-text-fill.svg');
require('@phosphor-icons/core/assets/regular/clock.svg');
require('@phosphor-icons/core/assets/fill/clock-fill.svg');
require('@phosphor-icons/core/assets/regular/clock-afternoon.svg');
require('@phosphor-icons/core/assets/fill/clock-afternoon-fill.svg');
require('@phosphor-icons/core/assets/regular/clock-clockwise.svg');
require('@phosphor-icons/core/assets/fill/clock-clockwise-fill.svg');
require('@phosphor-icons/core/assets/regular/clock-countdown.svg');
require('@phosphor-icons/core/assets/fill/clock-countdown-fill.svg');
require('@phosphor-icons/core/assets/regular/clock-counter-clockwise.svg');
require('@phosphor-icons/core/assets/fill/clock-counter-clockwise-fill.svg');
require('@phosphor-icons/core/assets/regular/closed-captioning.svg');
require('@phosphor-icons/core/assets/fill/closed-captioning-fill.svg');
require('@phosphor-icons/core/assets/regular/cloud.svg');
require('@phosphor-icons/core/assets/fill/cloud-fill.svg');
require('@phosphor-icons/core/assets/regular/cloud-arrow-down.svg');
require('@phosphor-icons/core/assets/fill/cloud-arrow-down-fill.svg');
require('@phosphor-icons/core/assets/regular/cloud-arrow-up.svg');
require('@phosphor-icons/core/assets/fill/cloud-arrow-up-fill.svg');
require('@phosphor-icons/core/assets/regular/cloud-check.svg');
require('@phosphor-icons/core/assets/fill/cloud-check-fill.svg');
require('@phosphor-icons/core/assets/regular/cloud-fog.svg');
require('@phosphor-icons/core/assets/fill/cloud-fog-fill.svg');
require('@phosphor-icons/core/assets/regular/cloud-lightning.svg');
require('@phosphor-icons/core/assets/fill/cloud-lightning-fill.svg');
require('@phosphor-icons/core/assets/regular/cloud-moon.svg');
require('@phosphor-icons/core/assets/fill/cloud-moon-fill.svg');
require('@phosphor-icons/core/assets/regular/cloud-rain.svg');
require('@phosphor-icons/core/assets/fill/cloud-rain-fill.svg');
require('@phosphor-icons/core/assets/regular/cloud-slash.svg');
require('@phosphor-icons/core/assets/fill/cloud-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/cloud-snow.svg');
require('@phosphor-icons/core/assets/fill/cloud-snow-fill.svg');
require('@phosphor-icons/core/assets/regular/cloud-sun.svg');
require('@phosphor-icons/core/assets/fill/cloud-sun-fill.svg');
require('@phosphor-icons/core/assets/regular/cloud-warning.svg');
require('@phosphor-icons/core/assets/fill/cloud-warning-fill.svg');
require('@phosphor-icons/core/assets/regular/cloud-x.svg');
require('@phosphor-icons/core/assets/fill/cloud-x-fill.svg');
require('@phosphor-icons/core/assets/regular/club.svg');
require('@phosphor-icons/core/assets/fill/club-fill.svg');
require('@phosphor-icons/core/assets/regular/coat-hanger.svg');
require('@phosphor-icons/core/assets/fill/coat-hanger-fill.svg');
require('@phosphor-icons/core/assets/regular/coda-logo.svg');
require('@phosphor-icons/core/assets/fill/coda-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/code.svg');
require('@phosphor-icons/core/assets/fill/code-fill.svg');
require('@phosphor-icons/core/assets/regular/code-block.svg');
require('@phosphor-icons/core/assets/fill/code-block-fill.svg');
require('@phosphor-icons/core/assets/regular/code-simple.svg');
require('@phosphor-icons/core/assets/fill/code-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/codepen-logo.svg');
require('@phosphor-icons/core/assets/fill/codepen-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/codesandbox-logo.svg');
require('@phosphor-icons/core/assets/fill/codesandbox-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/coffee.svg');
require('@phosphor-icons/core/assets/fill/coffee-fill.svg');
require('@phosphor-icons/core/assets/regular/coin.svg');
require('@phosphor-icons/core/assets/fill/coin-fill.svg');
require('@phosphor-icons/core/assets/regular/coin-vertical.svg');
require('@phosphor-icons/core/assets/fill/coin-vertical-fill.svg');
require('@phosphor-icons/core/assets/regular/coins.svg');
require('@phosphor-icons/core/assets/fill/coins-fill.svg');
require('@phosphor-icons/core/assets/regular/columns.svg');
require('@phosphor-icons/core/assets/fill/columns-fill.svg');
require('@phosphor-icons/core/assets/regular/command.svg');
require('@phosphor-icons/core/assets/fill/command-fill.svg');
require('@phosphor-icons/core/assets/regular/compass.svg');
require('@phosphor-icons/core/assets/fill/compass-fill.svg');
require('@phosphor-icons/core/assets/regular/compass-tool.svg');
require('@phosphor-icons/core/assets/fill/compass-tool-fill.svg');
require('@phosphor-icons/core/assets/regular/computer-tower.svg');
require('@phosphor-icons/core/assets/fill/computer-tower-fill.svg');
require('@phosphor-icons/core/assets/regular/confetti.svg');
require('@phosphor-icons/core/assets/fill/confetti-fill.svg');
require('@phosphor-icons/core/assets/regular/contactless-payment.svg');
require('@phosphor-icons/core/assets/fill/contactless-payment-fill.svg');
require('@phosphor-icons/core/assets/regular/control.svg');
require('@phosphor-icons/core/assets/fill/control-fill.svg');
require('@phosphor-icons/core/assets/regular/cookie.svg');
require('@phosphor-icons/core/assets/fill/cookie-fill.svg');
require('@phosphor-icons/core/assets/regular/cooking-pot.svg');
require('@phosphor-icons/core/assets/fill/cooking-pot-fill.svg');
require('@phosphor-icons/core/assets/regular/copy.svg');
require('@phosphor-icons/core/assets/fill/copy-fill.svg');
require('@phosphor-icons/core/assets/regular/copy-simple.svg');
require('@phosphor-icons/core/assets/fill/copy-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/copyleft.svg');
require('@phosphor-icons/core/assets/fill/copyleft-fill.svg');
require('@phosphor-icons/core/assets/regular/copyright.svg');
require('@phosphor-icons/core/assets/fill/copyright-fill.svg');
require('@phosphor-icons/core/assets/regular/corners-in.svg');
require('@phosphor-icons/core/assets/fill/corners-in-fill.svg');
require('@phosphor-icons/core/assets/regular/corners-out.svg');
require('@phosphor-icons/core/assets/fill/corners-out-fill.svg');
require('@phosphor-icons/core/assets/regular/couch.svg');
require('@phosphor-icons/core/assets/fill/couch-fill.svg');
require('@phosphor-icons/core/assets/regular/cpu.svg');
require('@phosphor-icons/core/assets/fill/cpu-fill.svg');
require('@phosphor-icons/core/assets/regular/credit-card.svg');
require('@phosphor-icons/core/assets/fill/credit-card-fill.svg');
require('@phosphor-icons/core/assets/regular/crop.svg');
require('@phosphor-icons/core/assets/fill/crop-fill.svg');
require('@phosphor-icons/core/assets/regular/cross.svg');
require('@phosphor-icons/core/assets/fill/cross-fill.svg');
require('@phosphor-icons/core/assets/regular/crosshair.svg');
require('@phosphor-icons/core/assets/fill/crosshair-fill.svg');
require('@phosphor-icons/core/assets/regular/crosshair-simple.svg');
require('@phosphor-icons/core/assets/fill/crosshair-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/crown.svg');
require('@phosphor-icons/core/assets/fill/crown-fill.svg');
require('@phosphor-icons/core/assets/regular/crown-simple.svg');
require('@phosphor-icons/core/assets/fill/crown-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/cube.svg');
require('@phosphor-icons/core/assets/fill/cube-fill.svg');
require('@phosphor-icons/core/assets/regular/cube-focus.svg');
require('@phosphor-icons/core/assets/fill/cube-focus-fill.svg');
require('@phosphor-icons/core/assets/regular/cube-transparent.svg');
require('@phosphor-icons/core/assets/fill/cube-transparent-fill.svg');
require('@phosphor-icons/core/assets/regular/currency-btc.svg');
require('@phosphor-icons/core/assets/fill/currency-btc-fill.svg');
require('@phosphor-icons/core/assets/regular/currency-circle-dollar.svg');
require('@phosphor-icons/core/assets/fill/currency-circle-dollar-fill.svg');
require('@phosphor-icons/core/assets/regular/currency-cny.svg');
require('@phosphor-icons/core/assets/fill/currency-cny-fill.svg');
require('@phosphor-icons/core/assets/regular/currency-dollar.svg');
require('@phosphor-icons/core/assets/fill/currency-dollar-fill.svg');
require('@phosphor-icons/core/assets/regular/currency-dollar-simple.svg');
require('@phosphor-icons/core/assets/fill/currency-dollar-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/currency-eth.svg');
require('@phosphor-icons/core/assets/fill/currency-eth-fill.svg');
require('@phosphor-icons/core/assets/regular/currency-eur.svg');
require('@phosphor-icons/core/assets/fill/currency-eur-fill.svg');
require('@phosphor-icons/core/assets/regular/currency-gbp.svg');
require('@phosphor-icons/core/assets/fill/currency-gbp-fill.svg');
require('@phosphor-icons/core/assets/regular/currency-inr.svg');
require('@phosphor-icons/core/assets/fill/currency-inr-fill.svg');
require('@phosphor-icons/core/assets/regular/currency-jpy.svg');
require('@phosphor-icons/core/assets/fill/currency-jpy-fill.svg');
require('@phosphor-icons/core/assets/regular/currency-krw.svg');
require('@phosphor-icons/core/assets/fill/currency-krw-fill.svg');
require('@phosphor-icons/core/assets/regular/currency-kzt.svg');
require('@phosphor-icons/core/assets/fill/currency-kzt-fill.svg');
require('@phosphor-icons/core/assets/regular/currency-ngn.svg');
require('@phosphor-icons/core/assets/fill/currency-ngn-fill.svg');
require('@phosphor-icons/core/assets/regular/currency-rub.svg');
require('@phosphor-icons/core/assets/fill/currency-rub-fill.svg');
require('@phosphor-icons/core/assets/regular/cursor.svg');
require('@phosphor-icons/core/assets/fill/cursor-fill.svg');
require('@phosphor-icons/core/assets/regular/cursor-click.svg');
require('@phosphor-icons/core/assets/fill/cursor-click-fill.svg');
require('@phosphor-icons/core/assets/regular/cursor-text.svg');
require('@phosphor-icons/core/assets/fill/cursor-text-fill.svg');
require('@phosphor-icons/core/assets/regular/cylinder.svg');
require('@phosphor-icons/core/assets/fill/cylinder-fill.svg');
require('@phosphor-icons/core/assets/regular/database.svg');
require('@phosphor-icons/core/assets/fill/database-fill.svg');
require('@phosphor-icons/core/assets/regular/desktop.svg');
require('@phosphor-icons/core/assets/fill/desktop-fill.svg');
require('@phosphor-icons/core/assets/regular/desktop-tower.svg');
require('@phosphor-icons/core/assets/fill/desktop-tower-fill.svg');
require('@phosphor-icons/core/assets/regular/detective.svg');
require('@phosphor-icons/core/assets/fill/detective-fill.svg');
require('@phosphor-icons/core/assets/regular/dev-to-logo.svg');
require('@phosphor-icons/core/assets/fill/dev-to-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/device-mobile.svg');
require('@phosphor-icons/core/assets/fill/device-mobile-fill.svg');
require('@phosphor-icons/core/assets/regular/device-mobile-camera.svg');
require('@phosphor-icons/core/assets/fill/device-mobile-camera-fill.svg');
require('@phosphor-icons/core/assets/regular/device-mobile-speaker.svg');
require('@phosphor-icons/core/assets/fill/device-mobile-speaker-fill.svg');
require('@phosphor-icons/core/assets/regular/device-tablet.svg');
require('@phosphor-icons/core/assets/fill/device-tablet-fill.svg');
require('@phosphor-icons/core/assets/regular/device-tablet-camera.svg');
require('@phosphor-icons/core/assets/fill/device-tablet-camera-fill.svg');
require('@phosphor-icons/core/assets/regular/device-tablet-speaker.svg');
require('@phosphor-icons/core/assets/fill/device-tablet-speaker-fill.svg');
require('@phosphor-icons/core/assets/regular/devices.svg');
require('@phosphor-icons/core/assets/fill/devices-fill.svg');
require('@phosphor-icons/core/assets/regular/diamond.svg');
require('@phosphor-icons/core/assets/fill/diamond-fill.svg');
require('@phosphor-icons/core/assets/regular/diamonds-four.svg');
require('@phosphor-icons/core/assets/fill/diamonds-four-fill.svg');
require('@phosphor-icons/core/assets/regular/dice-five.svg');
require('@phosphor-icons/core/assets/fill/dice-five-fill.svg');
require('@phosphor-icons/core/assets/regular/dice-four.svg');
require('@phosphor-icons/core/assets/fill/dice-four-fill.svg');
require('@phosphor-icons/core/assets/regular/dice-one.svg');
require('@phosphor-icons/core/assets/fill/dice-one-fill.svg');
require('@phosphor-icons/core/assets/regular/dice-six.svg');
require('@phosphor-icons/core/assets/fill/dice-six-fill.svg');
require('@phosphor-icons/core/assets/regular/dice-three.svg');
require('@phosphor-icons/core/assets/fill/dice-three-fill.svg');
require('@phosphor-icons/core/assets/regular/dice-two.svg');
require('@phosphor-icons/core/assets/fill/dice-two-fill.svg');
require('@phosphor-icons/core/assets/regular/disc.svg');
require('@phosphor-icons/core/assets/fill/disc-fill.svg');
require('@phosphor-icons/core/assets/regular/discord-logo.svg');
require('@phosphor-icons/core/assets/fill/discord-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/divide.svg');
require('@phosphor-icons/core/assets/fill/divide-fill.svg');
require('@phosphor-icons/core/assets/regular/dna.svg');
require('@phosphor-icons/core/assets/fill/dna-fill.svg');
require('@phosphor-icons/core/assets/regular/dog.svg');
require('@phosphor-icons/core/assets/fill/dog-fill.svg');
require('@phosphor-icons/core/assets/regular/door.svg');
require('@phosphor-icons/core/assets/fill/door-fill.svg');
require('@phosphor-icons/core/assets/regular/door-open.svg');
require('@phosphor-icons/core/assets/fill/door-open-fill.svg');
require('@phosphor-icons/core/assets/regular/dot.svg');
require('@phosphor-icons/core/assets/fill/dot-fill.svg');
require('@phosphor-icons/core/assets/regular/dot-outline.svg');
require('@phosphor-icons/core/assets/fill/dot-outline-fill.svg');
require('@phosphor-icons/core/assets/regular/dots-nine.svg');
require('@phosphor-icons/core/assets/fill/dots-nine-fill.svg');
require('@phosphor-icons/core/assets/regular/dots-six.svg');
require('@phosphor-icons/core/assets/fill/dots-six-fill.svg');
require('@phosphor-icons/core/assets/regular/dots-six-vertical.svg');
require('@phosphor-icons/core/assets/fill/dots-six-vertical-fill.svg');
require('@phosphor-icons/core/assets/regular/dots-three.svg');
require('@phosphor-icons/core/assets/fill/dots-three-fill.svg');
require('@phosphor-icons/core/assets/regular/dots-three-circle.svg');
require('@phosphor-icons/core/assets/fill/dots-three-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/dots-three-circle-vertical.svg');
require('@phosphor-icons/core/assets/fill/dots-three-circle-vertical-fill.svg');
require('@phosphor-icons/core/assets/regular/dots-three-outline.svg');
require('@phosphor-icons/core/assets/fill/dots-three-outline-fill.svg');
require('@phosphor-icons/core/assets/regular/dots-three-outline-vertical.svg');
require('@phosphor-icons/core/assets/fill/dots-three-outline-vertical-fill.svg');
require('@phosphor-icons/core/assets/regular/dots-three-vertical.svg');
require('@phosphor-icons/core/assets/fill/dots-three-vertical-fill.svg');
require('@phosphor-icons/core/assets/regular/download.svg');
require('@phosphor-icons/core/assets/fill/download-fill.svg');
require('@phosphor-icons/core/assets/regular/download-simple.svg');
require('@phosphor-icons/core/assets/fill/download-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/dress.svg');
require('@phosphor-icons/core/assets/fill/dress-fill.svg');
require('@phosphor-icons/core/assets/regular/dribbble-logo.svg');
require('@phosphor-icons/core/assets/fill/dribbble-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/drop.svg');
require('@phosphor-icons/core/assets/fill/drop-fill.svg');
require('@phosphor-icons/core/assets/regular/drop-half.svg');
require('@phosphor-icons/core/assets/fill/drop-half-fill.svg');
require('@phosphor-icons/core/assets/regular/drop-half-bottom.svg');
require('@phosphor-icons/core/assets/fill/drop-half-bottom-fill.svg');
require('@phosphor-icons/core/assets/regular/dropbox-logo.svg');
require('@phosphor-icons/core/assets/fill/dropbox-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/ear.svg');
require('@phosphor-icons/core/assets/fill/ear-fill.svg');
require('@phosphor-icons/core/assets/regular/ear-slash.svg');
require('@phosphor-icons/core/assets/fill/ear-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/egg.svg');
require('@phosphor-icons/core/assets/fill/egg-fill.svg');
require('@phosphor-icons/core/assets/regular/egg-crack.svg');
require('@phosphor-icons/core/assets/fill/egg-crack-fill.svg');
require('@phosphor-icons/core/assets/regular/eject.svg');
require('@phosphor-icons/core/assets/fill/eject-fill.svg');
require('@phosphor-icons/core/assets/regular/eject-simple.svg');
require('@phosphor-icons/core/assets/fill/eject-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/elevator.svg');
require('@phosphor-icons/core/assets/fill/elevator-fill.svg');
require('@phosphor-icons/core/assets/regular/engine.svg');
require('@phosphor-icons/core/assets/fill/engine-fill.svg');
require('@phosphor-icons/core/assets/regular/envelope.svg');
require('@phosphor-icons/core/assets/fill/envelope-fill.svg');
require('@phosphor-icons/core/assets/regular/envelope-open.svg');
require('@phosphor-icons/core/assets/fill/envelope-open-fill.svg');
require('@phosphor-icons/core/assets/regular/envelope-simple.svg');
require('@phosphor-icons/core/assets/fill/envelope-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/envelope-simple-open.svg');
require('@phosphor-icons/core/assets/fill/envelope-simple-open-fill.svg');
require('@phosphor-icons/core/assets/regular/equalizer.svg');
require('@phosphor-icons/core/assets/fill/equalizer-fill.svg');
require('@phosphor-icons/core/assets/regular/equals.svg');
require('@phosphor-icons/core/assets/fill/equals-fill.svg');
require('@phosphor-icons/core/assets/regular/eraser.svg');
require('@phosphor-icons/core/assets/fill/eraser-fill.svg');
require('@phosphor-icons/core/assets/regular/escalator-down.svg');
require('@phosphor-icons/core/assets/fill/escalator-down-fill.svg');
require('@phosphor-icons/core/assets/regular/escalator-up.svg');
require('@phosphor-icons/core/assets/fill/escalator-up-fill.svg');
require('@phosphor-icons/core/assets/regular/exam.svg');
require('@phosphor-icons/core/assets/fill/exam-fill.svg');
require('@phosphor-icons/core/assets/regular/exclude.svg');
require('@phosphor-icons/core/assets/fill/exclude-fill.svg');
require('@phosphor-icons/core/assets/regular/exclude-square.svg');
require('@phosphor-icons/core/assets/fill/exclude-square-fill.svg');
require('@phosphor-icons/core/assets/regular/export.svg');
require('@phosphor-icons/core/assets/fill/export-fill.svg');
require('@phosphor-icons/core/assets/regular/eye.svg');
require('@phosphor-icons/core/assets/fill/eye-fill.svg');
require('@phosphor-icons/core/assets/regular/eye-closed.svg');
require('@phosphor-icons/core/assets/fill/eye-closed-fill.svg');
require('@phosphor-icons/core/assets/regular/eye-slash.svg');
require('@phosphor-icons/core/assets/fill/eye-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/eyedropper.svg');
require('@phosphor-icons/core/assets/fill/eyedropper-fill.svg');
require('@phosphor-icons/core/assets/regular/eyedropper-sample.svg');
require('@phosphor-icons/core/assets/fill/eyedropper-sample-fill.svg');
require('@phosphor-icons/core/assets/regular/eyeglasses.svg');
require('@phosphor-icons/core/assets/fill/eyeglasses-fill.svg');
require('@phosphor-icons/core/assets/regular/face-mask.svg');
require('@phosphor-icons/core/assets/fill/face-mask-fill.svg');
require('@phosphor-icons/core/assets/regular/facebook-logo.svg');
require('@phosphor-icons/core/assets/fill/facebook-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/factory.svg');
require('@phosphor-icons/core/assets/fill/factory-fill.svg');
require('@phosphor-icons/core/assets/regular/faders.svg');
require('@phosphor-icons/core/assets/fill/faders-fill.svg');
require('@phosphor-icons/core/assets/regular/faders-horizontal.svg');
require('@phosphor-icons/core/assets/fill/faders-horizontal-fill.svg');
require('@phosphor-icons/core/assets/regular/fan.svg');
require('@phosphor-icons/core/assets/fill/fan-fill.svg');
require('@phosphor-icons/core/assets/regular/fast-forward.svg');
require('@phosphor-icons/core/assets/fill/fast-forward-fill.svg');
require('@phosphor-icons/core/assets/regular/fast-forward-circle.svg');
require('@phosphor-icons/core/assets/fill/fast-forward-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/feather.svg');
require('@phosphor-icons/core/assets/fill/feather-fill.svg');
require('@phosphor-icons/core/assets/regular/figma-logo.svg');
require('@phosphor-icons/core/assets/fill/figma-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/file.svg');
require('@phosphor-icons/core/assets/fill/file-fill.svg');
require('@phosphor-icons/core/assets/regular/file-archive.svg');
require('@phosphor-icons/core/assets/fill/file-archive-fill.svg');
require('@phosphor-icons/core/assets/regular/file-arrow-down.svg');
require('@phosphor-icons/core/assets/fill/file-arrow-down-fill.svg');
require('@phosphor-icons/core/assets/regular/file-arrow-up.svg');
require('@phosphor-icons/core/assets/fill/file-arrow-up-fill.svg');
require('@phosphor-icons/core/assets/regular/file-audio.svg');
require('@phosphor-icons/core/assets/fill/file-audio-fill.svg');
require('@phosphor-icons/core/assets/regular/file-cloud.svg');
require('@phosphor-icons/core/assets/fill/file-cloud-fill.svg');
require('@phosphor-icons/core/assets/regular/file-code.svg');
require('@phosphor-icons/core/assets/fill/file-code-fill.svg');
require('@phosphor-icons/core/assets/regular/file-css.svg');
require('@phosphor-icons/core/assets/fill/file-css-fill.svg');
require('@phosphor-icons/core/assets/regular/file-csv.svg');
require('@phosphor-icons/core/assets/fill/file-csv-fill.svg');
require('@phosphor-icons/core/assets/regular/file-dashed.svg');
require('@phosphor-icons/core/assets/fill/file-dashed-fill.svg');
require('@phosphor-icons/core/assets/regular/file-doc.svg');
require('@phosphor-icons/core/assets/fill/file-doc-fill.svg');
require('@phosphor-icons/core/assets/regular/file-html.svg');
require('@phosphor-icons/core/assets/fill/file-html-fill.svg');
require('@phosphor-icons/core/assets/regular/file-image.svg');
require('@phosphor-icons/core/assets/fill/file-image-fill.svg');
require('@phosphor-icons/core/assets/regular/file-jpg.svg');
require('@phosphor-icons/core/assets/fill/file-jpg-fill.svg');
require('@phosphor-icons/core/assets/regular/file-js.svg');
require('@phosphor-icons/core/assets/fill/file-js-fill.svg');
require('@phosphor-icons/core/assets/regular/file-jsx.svg');
require('@phosphor-icons/core/assets/fill/file-jsx-fill.svg');
require('@phosphor-icons/core/assets/regular/file-lock.svg');
require('@phosphor-icons/core/assets/fill/file-lock-fill.svg');
require('@phosphor-icons/core/assets/regular/file-magnifying-glass.svg');
require('@phosphor-icons/core/assets/fill/file-magnifying-glass-fill.svg');
require('@phosphor-icons/core/assets/regular/file-minus.svg');
require('@phosphor-icons/core/assets/fill/file-minus-fill.svg');
require('@phosphor-icons/core/assets/regular/file-pdf.svg');
require('@phosphor-icons/core/assets/fill/file-pdf-fill.svg');
require('@phosphor-icons/core/assets/regular/file-plus.svg');
require('@phosphor-icons/core/assets/fill/file-plus-fill.svg');
require('@phosphor-icons/core/assets/regular/file-png.svg');
require('@phosphor-icons/core/assets/fill/file-png-fill.svg');
require('@phosphor-icons/core/assets/regular/file-ppt.svg');
require('@phosphor-icons/core/assets/fill/file-ppt-fill.svg');
require('@phosphor-icons/core/assets/regular/file-rs.svg');
require('@phosphor-icons/core/assets/fill/file-rs-fill.svg');
require('@phosphor-icons/core/assets/regular/file-sql.svg');
require('@phosphor-icons/core/assets/fill/file-sql-fill.svg');
require('@phosphor-icons/core/assets/regular/file-svg.svg');
require('@phosphor-icons/core/assets/fill/file-svg-fill.svg');
require('@phosphor-icons/core/assets/regular/file-text.svg');
require('@phosphor-icons/core/assets/fill/file-text-fill.svg');
require('@phosphor-icons/core/assets/regular/file-ts.svg');
require('@phosphor-icons/core/assets/fill/file-ts-fill.svg');
require('@phosphor-icons/core/assets/regular/file-tsx.svg');
require('@phosphor-icons/core/assets/fill/file-tsx-fill.svg');
require('@phosphor-icons/core/assets/regular/file-video.svg');
require('@phosphor-icons/core/assets/fill/file-video-fill.svg');
require('@phosphor-icons/core/assets/regular/file-vue.svg');
require('@phosphor-icons/core/assets/fill/file-vue-fill.svg');
require('@phosphor-icons/core/assets/regular/file-x.svg');
require('@phosphor-icons/core/assets/fill/file-x-fill.svg');
require('@phosphor-icons/core/assets/regular/file-xls.svg');
require('@phosphor-icons/core/assets/fill/file-xls-fill.svg');
require('@phosphor-icons/core/assets/regular/file-zip.svg');
require('@phosphor-icons/core/assets/fill/file-zip-fill.svg');
require('@phosphor-icons/core/assets/regular/files.svg');
require('@phosphor-icons/core/assets/fill/files-fill.svg');
require('@phosphor-icons/core/assets/regular/film-reel.svg');
require('@phosphor-icons/core/assets/fill/film-reel-fill.svg');
require('@phosphor-icons/core/assets/regular/film-script.svg');
require('@phosphor-icons/core/assets/fill/film-script-fill.svg');
require('@phosphor-icons/core/assets/regular/film-slate.svg');
require('@phosphor-icons/core/assets/fill/film-slate-fill.svg');
require('@phosphor-icons/core/assets/regular/film-strip.svg');
require('@phosphor-icons/core/assets/fill/film-strip-fill.svg');
require('@phosphor-icons/core/assets/regular/fingerprint.svg');
require('@phosphor-icons/core/assets/fill/fingerprint-fill.svg');
require('@phosphor-icons/core/assets/regular/fingerprint-simple.svg');
require('@phosphor-icons/core/assets/fill/fingerprint-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/finn-the-human.svg');
require('@phosphor-icons/core/assets/fill/finn-the-human-fill.svg');
require('@phosphor-icons/core/assets/regular/fire.svg');
require('@phosphor-icons/core/assets/fill/fire-fill.svg');
require('@phosphor-icons/core/assets/regular/fire-extinguisher.svg');
require('@phosphor-icons/core/assets/fill/fire-extinguisher-fill.svg');
require('@phosphor-icons/core/assets/regular/fire-simple.svg');
require('@phosphor-icons/core/assets/fill/fire-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/first-aid.svg');
require('@phosphor-icons/core/assets/fill/first-aid-fill.svg');
require('@phosphor-icons/core/assets/regular/first-aid-kit.svg');
require('@phosphor-icons/core/assets/fill/first-aid-kit-fill.svg');
require('@phosphor-icons/core/assets/regular/fish.svg');
require('@phosphor-icons/core/assets/fill/fish-fill.svg');
require('@phosphor-icons/core/assets/regular/fish-simple.svg');
require('@phosphor-icons/core/assets/fill/fish-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/flag.svg');
require('@phosphor-icons/core/assets/fill/flag-fill.svg');
require('@phosphor-icons/core/assets/regular/flag-banner.svg');
require('@phosphor-icons/core/assets/fill/flag-banner-fill.svg');
require('@phosphor-icons/core/assets/regular/flag-checkered.svg');
require('@phosphor-icons/core/assets/fill/flag-checkered-fill.svg');
require('@phosphor-icons/core/assets/regular/flag-pennant.svg');
require('@phosphor-icons/core/assets/fill/flag-pennant-fill.svg');
require('@phosphor-icons/core/assets/regular/flame.svg');
require('@phosphor-icons/core/assets/fill/flame-fill.svg');
require('@phosphor-icons/core/assets/regular/flashlight.svg');
require('@phosphor-icons/core/assets/fill/flashlight-fill.svg');
require('@phosphor-icons/core/assets/regular/flask.svg');
require('@phosphor-icons/core/assets/fill/flask-fill.svg');
require('@phosphor-icons/core/assets/regular/floppy-disk.svg');
require('@phosphor-icons/core/assets/fill/floppy-disk-fill.svg');
require('@phosphor-icons/core/assets/regular/floppy-disk-back.svg');
require('@phosphor-icons/core/assets/fill/floppy-disk-back-fill.svg');
require('@phosphor-icons/core/assets/regular/flow-arrow.svg');
require('@phosphor-icons/core/assets/fill/flow-arrow-fill.svg');
require('@phosphor-icons/core/assets/regular/flower.svg');
require('@phosphor-icons/core/assets/fill/flower-fill.svg');
require('@phosphor-icons/core/assets/regular/flower-lotus.svg');
require('@phosphor-icons/core/assets/fill/flower-lotus-fill.svg');
require('@phosphor-icons/core/assets/regular/flower-tulip.svg');
require('@phosphor-icons/core/assets/fill/flower-tulip-fill.svg');
require('@phosphor-icons/core/assets/regular/flying-saucer.svg');
require('@phosphor-icons/core/assets/fill/flying-saucer-fill.svg');
require('@phosphor-icons/core/assets/regular/folder.svg');
require('@phosphor-icons/core/assets/fill/folder-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-dashed.svg');
require('@phosphor-icons/core/assets/fill/folder-dashed-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-lock.svg');
require('@phosphor-icons/core/assets/fill/folder-lock-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-minus.svg');
require('@phosphor-icons/core/assets/fill/folder-minus-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-notch.svg');
require('@phosphor-icons/core/assets/fill/folder-notch-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-notch-minus.svg');
require('@phosphor-icons/core/assets/fill/folder-notch-minus-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-notch-open.svg');
require('@phosphor-icons/core/assets/fill/folder-notch-open-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-notch-plus.svg');
require('@phosphor-icons/core/assets/fill/folder-notch-plus-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-open.svg');
require('@phosphor-icons/core/assets/fill/folder-open-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-plus.svg');
require('@phosphor-icons/core/assets/fill/folder-plus-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-simple.svg');
require('@phosphor-icons/core/assets/fill/folder-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-simple-dashed.svg');
require('@phosphor-icons/core/assets/fill/folder-simple-dashed-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-simple-lock.svg');
require('@phosphor-icons/core/assets/fill/folder-simple-lock-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-simple-minus.svg');
require('@phosphor-icons/core/assets/fill/folder-simple-minus-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-simple-plus.svg');
require('@phosphor-icons/core/assets/fill/folder-simple-plus-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-simple-star.svg');
require('@phosphor-icons/core/assets/fill/folder-simple-star-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-simple-user.svg');
require('@phosphor-icons/core/assets/fill/folder-simple-user-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-star.svg');
require('@phosphor-icons/core/assets/fill/folder-star-fill.svg');
require('@phosphor-icons/core/assets/regular/folder-user.svg');
require('@phosphor-icons/core/assets/fill/folder-user-fill.svg');
require('@phosphor-icons/core/assets/regular/folders.svg');
require('@phosphor-icons/core/assets/fill/folders-fill.svg');
require('@phosphor-icons/core/assets/regular/football.svg');
require('@phosphor-icons/core/assets/fill/football-fill.svg');
require('@phosphor-icons/core/assets/regular/footprints.svg');
require('@phosphor-icons/core/assets/fill/footprints-fill.svg');
require('@phosphor-icons/core/assets/regular/fork-knife.svg');
require('@phosphor-icons/core/assets/fill/fork-knife-fill.svg');
require('@phosphor-icons/core/assets/regular/frame-corners.svg');
require('@phosphor-icons/core/assets/fill/frame-corners-fill.svg');
require('@phosphor-icons/core/assets/regular/framer-logo.svg');
require('@phosphor-icons/core/assets/fill/framer-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/function.svg');
require('@phosphor-icons/core/assets/fill/function-fill.svg');
require('@phosphor-icons/core/assets/regular/funnel.svg');
require('@phosphor-icons/core/assets/fill/funnel-fill.svg');
require('@phosphor-icons/core/assets/regular/funnel-simple.svg');
require('@phosphor-icons/core/assets/fill/funnel-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/game-controller.svg');
require('@phosphor-icons/core/assets/fill/game-controller-fill.svg');
require('@phosphor-icons/core/assets/regular/garage.svg');
require('@phosphor-icons/core/assets/fill/garage-fill.svg');
require('@phosphor-icons/core/assets/regular/gas-can.svg');
require('@phosphor-icons/core/assets/fill/gas-can-fill.svg');
require('@phosphor-icons/core/assets/regular/gas-pump.svg');
require('@phosphor-icons/core/assets/fill/gas-pump-fill.svg');
require('@phosphor-icons/core/assets/regular/gauge.svg');
require('@phosphor-icons/core/assets/fill/gauge-fill.svg');
require('@phosphor-icons/core/assets/regular/gavel.svg');
require('@phosphor-icons/core/assets/fill/gavel-fill.svg');
require('@phosphor-icons/core/assets/regular/gear.svg');
require('@phosphor-icons/core/assets/fill/gear-fill.svg');
require('@phosphor-icons/core/assets/regular/gear-fine.svg');
require('@phosphor-icons/core/assets/fill/gear-fine-fill.svg');
require('@phosphor-icons/core/assets/regular/gear-six.svg');
require('@phosphor-icons/core/assets/fill/gear-six-fill.svg');
require('@phosphor-icons/core/assets/regular/gender-female.svg');
require('@phosphor-icons/core/assets/fill/gender-female-fill.svg');
require('@phosphor-icons/core/assets/regular/gender-intersex.svg');
require('@phosphor-icons/core/assets/fill/gender-intersex-fill.svg');
require('@phosphor-icons/core/assets/regular/gender-male.svg');
require('@phosphor-icons/core/assets/fill/gender-male-fill.svg');
require('@phosphor-icons/core/assets/regular/gender-neuter.svg');
require('@phosphor-icons/core/assets/fill/gender-neuter-fill.svg');
require('@phosphor-icons/core/assets/regular/gender-nonbinary.svg');
require('@phosphor-icons/core/assets/fill/gender-nonbinary-fill.svg');
require('@phosphor-icons/core/assets/regular/gender-transgender.svg');
require('@phosphor-icons/core/assets/fill/gender-transgender-fill.svg');
require('@phosphor-icons/core/assets/regular/ghost.svg');
require('@phosphor-icons/core/assets/fill/ghost-fill.svg');
require('@phosphor-icons/core/assets/regular/gif.svg');
require('@phosphor-icons/core/assets/fill/gif-fill.svg');
require('@phosphor-icons/core/assets/regular/gift.svg');
require('@phosphor-icons/core/assets/fill/gift-fill.svg');
require('@phosphor-icons/core/assets/regular/git-branch.svg');
require('@phosphor-icons/core/assets/fill/git-branch-fill.svg');
require('@phosphor-icons/core/assets/regular/git-commit.svg');
require('@phosphor-icons/core/assets/fill/git-commit-fill.svg');
require('@phosphor-icons/core/assets/regular/git-diff.svg');
require('@phosphor-icons/core/assets/fill/git-diff-fill.svg');
require('@phosphor-icons/core/assets/regular/git-fork.svg');
require('@phosphor-icons/core/assets/fill/git-fork-fill.svg');
require('@phosphor-icons/core/assets/regular/git-merge.svg');
require('@phosphor-icons/core/assets/fill/git-merge-fill.svg');
require('@phosphor-icons/core/assets/regular/git-pull-request.svg');
require('@phosphor-icons/core/assets/fill/git-pull-request-fill.svg');
require('@phosphor-icons/core/assets/regular/github-logo.svg');
require('@phosphor-icons/core/assets/fill/github-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/gitlab-logo.svg');
require('@phosphor-icons/core/assets/fill/gitlab-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/gitlab-logo-simple.svg');
require('@phosphor-icons/core/assets/fill/gitlab-logo-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/globe.svg');
require('@phosphor-icons/core/assets/fill/globe-fill.svg');
require('@phosphor-icons/core/assets/regular/globe-hemisphere-east.svg');
require('@phosphor-icons/core/assets/fill/globe-hemisphere-east-fill.svg');
require('@phosphor-icons/core/assets/regular/globe-hemisphere-west.svg');
require('@phosphor-icons/core/assets/fill/globe-hemisphere-west-fill.svg');
require('@phosphor-icons/core/assets/regular/globe-simple.svg');
require('@phosphor-icons/core/assets/fill/globe-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/globe-stand.svg');
require('@phosphor-icons/core/assets/fill/globe-stand-fill.svg');
require('@phosphor-icons/core/assets/regular/goggles.svg');
require('@phosphor-icons/core/assets/fill/goggles-fill.svg');
require('@phosphor-icons/core/assets/regular/goodreads-logo.svg');
require('@phosphor-icons/core/assets/fill/goodreads-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/google-cardboard-logo.svg');
require('@phosphor-icons/core/assets/fill/google-cardboard-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/google-chrome-logo.svg');
require('@phosphor-icons/core/assets/fill/google-chrome-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/google-drive-logo.svg');
require('@phosphor-icons/core/assets/fill/google-drive-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/google-logo.svg');
require('@phosphor-icons/core/assets/fill/google-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/google-photos-logo.svg');
require('@phosphor-icons/core/assets/fill/google-photos-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/google-play-logo.svg');
require('@phosphor-icons/core/assets/fill/google-play-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/google-podcasts-logo.svg');
require('@phosphor-icons/core/assets/fill/google-podcasts-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/gradient.svg');
require('@phosphor-icons/core/assets/fill/gradient-fill.svg');
require('@phosphor-icons/core/assets/regular/graduation-cap.svg');
require('@phosphor-icons/core/assets/fill/graduation-cap-fill.svg');
require('@phosphor-icons/core/assets/regular/grains.svg');
require('@phosphor-icons/core/assets/fill/grains-fill.svg');
require('@phosphor-icons/core/assets/regular/grains-slash.svg');
require('@phosphor-icons/core/assets/fill/grains-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/graph.svg');
require('@phosphor-icons/core/assets/fill/graph-fill.svg');
require('@phosphor-icons/core/assets/regular/grid-four.svg');
require('@phosphor-icons/core/assets/fill/grid-four-fill.svg');
require('@phosphor-icons/core/assets/regular/grid-nine.svg');
require('@phosphor-icons/core/assets/fill/grid-nine-fill.svg');
require('@phosphor-icons/core/assets/regular/guitar.svg');
require('@phosphor-icons/core/assets/fill/guitar-fill.svg');
require('@phosphor-icons/core/assets/regular/hamburger.svg');
require('@phosphor-icons/core/assets/fill/hamburger-fill.svg');
require('@phosphor-icons/core/assets/regular/hammer.svg');
require('@phosphor-icons/core/assets/fill/hammer-fill.svg');
require('@phosphor-icons/core/assets/regular/hand.svg');
require('@phosphor-icons/core/assets/fill/hand-fill.svg');
require('@phosphor-icons/core/assets/regular/hand-coins.svg');
require('@phosphor-icons/core/assets/fill/hand-coins-fill.svg');
require('@phosphor-icons/core/assets/regular/hand-eye.svg');
require('@phosphor-icons/core/assets/fill/hand-eye-fill.svg');
require('@phosphor-icons/core/assets/regular/hand-fist.svg');
require('@phosphor-icons/core/assets/fill/hand-fist-fill.svg');
require('@phosphor-icons/core/assets/regular/hand-grabbing.svg');
require('@phosphor-icons/core/assets/fill/hand-grabbing-fill.svg');
require('@phosphor-icons/core/assets/regular/hand-heart.svg');
require('@phosphor-icons/core/assets/fill/hand-heart-fill.svg');
require('@phosphor-icons/core/assets/regular/hand-palm.svg');
require('@phosphor-icons/core/assets/fill/hand-palm-fill.svg');
require('@phosphor-icons/core/assets/regular/hand-pointing.svg');
require('@phosphor-icons/core/assets/fill/hand-pointing-fill.svg');
require('@phosphor-icons/core/assets/regular/hand-soap.svg');
require('@phosphor-icons/core/assets/fill/hand-soap-fill.svg');
require('@phosphor-icons/core/assets/regular/hand-swipe-left.svg');
require('@phosphor-icons/core/assets/fill/hand-swipe-left-fill.svg');
require('@phosphor-icons/core/assets/regular/hand-swipe-right.svg');
require('@phosphor-icons/core/assets/fill/hand-swipe-right-fill.svg');
require('@phosphor-icons/core/assets/regular/hand-tap.svg');
require('@phosphor-icons/core/assets/fill/hand-tap-fill.svg');
require('@phosphor-icons/core/assets/regular/hand-waving.svg');
require('@phosphor-icons/core/assets/fill/hand-waving-fill.svg');
require('@phosphor-icons/core/assets/regular/handbag.svg');
require('@phosphor-icons/core/assets/fill/handbag-fill.svg');
require('@phosphor-icons/core/assets/regular/handbag-simple.svg');
require('@phosphor-icons/core/assets/fill/handbag-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/hands-clapping.svg');
require('@phosphor-icons/core/assets/fill/hands-clapping-fill.svg');
require('@phosphor-icons/core/assets/regular/hands-praying.svg');
require('@phosphor-icons/core/assets/fill/hands-praying-fill.svg');
require('@phosphor-icons/core/assets/regular/handshake.svg');
require('@phosphor-icons/core/assets/fill/handshake-fill.svg');
require('@phosphor-icons/core/assets/regular/hard-drive.svg');
require('@phosphor-icons/core/assets/fill/hard-drive-fill.svg');
require('@phosphor-icons/core/assets/regular/hard-drives.svg');
require('@phosphor-icons/core/assets/fill/hard-drives-fill.svg');
require('@phosphor-icons/core/assets/regular/hash.svg');
require('@phosphor-icons/core/assets/fill/hash-fill.svg');
require('@phosphor-icons/core/assets/regular/hash-straight.svg');
require('@phosphor-icons/core/assets/fill/hash-straight-fill.svg');
require('@phosphor-icons/core/assets/regular/headlights.svg');
require('@phosphor-icons/core/assets/fill/headlights-fill.svg');
require('@phosphor-icons/core/assets/regular/headphones.svg');
require('@phosphor-icons/core/assets/fill/headphones-fill.svg');
require('@phosphor-icons/core/assets/regular/headset.svg');
require('@phosphor-icons/core/assets/fill/headset-fill.svg');
require('@phosphor-icons/core/assets/regular/heart.svg');
require('@phosphor-icons/core/assets/fill/heart-fill.svg');
require('@phosphor-icons/core/assets/regular/heart-break.svg');
require('@phosphor-icons/core/assets/fill/heart-break-fill.svg');
require('@phosphor-icons/core/assets/regular/heart-half.svg');
require('@phosphor-icons/core/assets/fill/heart-half-fill.svg');
require('@phosphor-icons/core/assets/regular/heart-straight.svg');
require('@phosphor-icons/core/assets/fill/heart-straight-fill.svg');
require('@phosphor-icons/core/assets/regular/heart-straight-break.svg');
require('@phosphor-icons/core/assets/fill/heart-straight-break-fill.svg');
require('@phosphor-icons/core/assets/regular/heartbeat.svg');
require('@phosphor-icons/core/assets/fill/heartbeat-fill.svg');
require('@phosphor-icons/core/assets/regular/hexagon.svg');
require('@phosphor-icons/core/assets/fill/hexagon-fill.svg');
require('@phosphor-icons/core/assets/regular/high-heel.svg');
require('@phosphor-icons/core/assets/fill/high-heel-fill.svg');
require('@phosphor-icons/core/assets/regular/highlighter-circle.svg');
require('@phosphor-icons/core/assets/fill/highlighter-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/hoodie.svg');
require('@phosphor-icons/core/assets/fill/hoodie-fill.svg');
require('@phosphor-icons/core/assets/regular/horse.svg');
require('@phosphor-icons/core/assets/fill/horse-fill.svg');
require('@phosphor-icons/core/assets/regular/hourglass.svg');
require('@phosphor-icons/core/assets/fill/hourglass-fill.svg');
require('@phosphor-icons/core/assets/regular/hourglass-high.svg');
require('@phosphor-icons/core/assets/fill/hourglass-high-fill.svg');
require('@phosphor-icons/core/assets/regular/hourglass-low.svg');
require('@phosphor-icons/core/assets/fill/hourglass-low-fill.svg');
require('@phosphor-icons/core/assets/regular/hourglass-medium.svg');
require('@phosphor-icons/core/assets/fill/hourglass-medium-fill.svg');
require('@phosphor-icons/core/assets/regular/hourglass-simple.svg');
require('@phosphor-icons/core/assets/fill/hourglass-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/hourglass-simple-high.svg');
require('@phosphor-icons/core/assets/fill/hourglass-simple-high-fill.svg');
require('@phosphor-icons/core/assets/regular/hourglass-simple-low.svg');
require('@phosphor-icons/core/assets/fill/hourglass-simple-low-fill.svg');
require('@phosphor-icons/core/assets/regular/hourglass-simple-medium.svg');
require('@phosphor-icons/core/assets/fill/hourglass-simple-medium-fill.svg');
require('@phosphor-icons/core/assets/regular/house.svg');
require('@phosphor-icons/core/assets/fill/house-fill.svg');
require('@phosphor-icons/core/assets/regular/house-line.svg');
require('@phosphor-icons/core/assets/fill/house-line-fill.svg');
require('@phosphor-icons/core/assets/regular/house-simple.svg');
require('@phosphor-icons/core/assets/fill/house-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/ice-cream.svg');
require('@phosphor-icons/core/assets/fill/ice-cream-fill.svg');
require('@phosphor-icons/core/assets/regular/identification-badge.svg');
require('@phosphor-icons/core/assets/fill/identification-badge-fill.svg');
require('@phosphor-icons/core/assets/regular/identification-card.svg');
require('@phosphor-icons/core/assets/fill/identification-card-fill.svg');
require('@phosphor-icons/core/assets/regular/image.svg');
require('@phosphor-icons/core/assets/fill/image-fill.svg');
require('@phosphor-icons/core/assets/regular/image-square.svg');
require('@phosphor-icons/core/assets/fill/image-square-fill.svg');
require('@phosphor-icons/core/assets/regular/images.svg');
require('@phosphor-icons/core/assets/fill/images-fill.svg');
require('@phosphor-icons/core/assets/regular/images-square.svg');
require('@phosphor-icons/core/assets/fill/images-square-fill.svg');
require('@phosphor-icons/core/assets/regular/infinity.svg');
require('@phosphor-icons/core/assets/fill/infinity-fill.svg');
const info_svg = require('@phosphor-icons/core/assets/regular/info.svg');
require('@phosphor-icons/core/assets/fill/info-fill.svg');
require('@phosphor-icons/core/assets/regular/instagram-logo.svg');
require('@phosphor-icons/core/assets/fill/instagram-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/intersect.svg');
require('@phosphor-icons/core/assets/fill/intersect-fill.svg');
require('@phosphor-icons/core/assets/regular/intersect-square.svg');
require('@phosphor-icons/core/assets/fill/intersect-square-fill.svg');
require('@phosphor-icons/core/assets/regular/intersect-three.svg');
require('@phosphor-icons/core/assets/fill/intersect-three-fill.svg');
require('@phosphor-icons/core/assets/regular/jeep.svg');
require('@phosphor-icons/core/assets/fill/jeep-fill.svg');
require('@phosphor-icons/core/assets/regular/kanban.svg');
require('@phosphor-icons/core/assets/fill/kanban-fill.svg');
require('@phosphor-icons/core/assets/regular/key.svg');
require('@phosphor-icons/core/assets/fill/key-fill.svg');
require('@phosphor-icons/core/assets/regular/key-return.svg');
require('@phosphor-icons/core/assets/fill/key-return-fill.svg');
require('@phosphor-icons/core/assets/regular/keyboard.svg');
require('@phosphor-icons/core/assets/fill/keyboard-fill.svg');
require('@phosphor-icons/core/assets/regular/keyhole.svg');
require('@phosphor-icons/core/assets/fill/keyhole-fill.svg');
require('@phosphor-icons/core/assets/regular/knife.svg');
require('@phosphor-icons/core/assets/fill/knife-fill.svg');
require('@phosphor-icons/core/assets/regular/ladder.svg');
require('@phosphor-icons/core/assets/fill/ladder-fill.svg');
require('@phosphor-icons/core/assets/regular/ladder-simple.svg');
require('@phosphor-icons/core/assets/fill/ladder-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/lamp.svg');
require('@phosphor-icons/core/assets/fill/lamp-fill.svg');
require('@phosphor-icons/core/assets/regular/laptop.svg');
require('@phosphor-icons/core/assets/fill/laptop-fill.svg');
require('@phosphor-icons/core/assets/regular/layout.svg');
require('@phosphor-icons/core/assets/fill/layout-fill.svg');
require('@phosphor-icons/core/assets/regular/leaf.svg');
require('@phosphor-icons/core/assets/fill/leaf-fill.svg');
require('@phosphor-icons/core/assets/regular/lifebuoy.svg');
require('@phosphor-icons/core/assets/fill/lifebuoy-fill.svg');
require('@phosphor-icons/core/assets/regular/lightbulb.svg');
require('@phosphor-icons/core/assets/fill/lightbulb-fill.svg');
require('@phosphor-icons/core/assets/regular/lightbulb-filament.svg');
require('@phosphor-icons/core/assets/fill/lightbulb-filament-fill.svg');
require('@phosphor-icons/core/assets/regular/lighthouse.svg');
require('@phosphor-icons/core/assets/fill/lighthouse-fill.svg');
require('@phosphor-icons/core/assets/regular/lightning.svg');
require('@phosphor-icons/core/assets/fill/lightning-fill.svg');
require('@phosphor-icons/core/assets/regular/lightning-a.svg');
require('@phosphor-icons/core/assets/fill/lightning-a-fill.svg');
require('@phosphor-icons/core/assets/regular/lightning-slash.svg');
require('@phosphor-icons/core/assets/fill/lightning-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/line-segment.svg');
require('@phosphor-icons/core/assets/fill/line-segment-fill.svg');
require('@phosphor-icons/core/assets/regular/line-segments.svg');
require('@phosphor-icons/core/assets/fill/line-segments-fill.svg');
require('@phosphor-icons/core/assets/regular/link.svg');
require('@phosphor-icons/core/assets/fill/link-fill.svg');
require('@phosphor-icons/core/assets/regular/link-break.svg');
require('@phosphor-icons/core/assets/fill/link-break-fill.svg');
require('@phosphor-icons/core/assets/regular/link-simple.svg');
require('@phosphor-icons/core/assets/fill/link-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/link-simple-break.svg');
require('@phosphor-icons/core/assets/fill/link-simple-break-fill.svg');
require('@phosphor-icons/core/assets/regular/link-simple-horizontal.svg');
require('@phosphor-icons/core/assets/fill/link-simple-horizontal-fill.svg');
require('@phosphor-icons/core/assets/regular/link-simple-horizontal-break.svg');
require('@phosphor-icons/core/assets/fill/link-simple-horizontal-break-fill.svg');
require('@phosphor-icons/core/assets/regular/linkedin-logo.svg');
require('@phosphor-icons/core/assets/fill/linkedin-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/linux-logo.svg');
require('@phosphor-icons/core/assets/fill/linux-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/list.svg');
require('@phosphor-icons/core/assets/fill/list-fill.svg');
require('@phosphor-icons/core/assets/regular/list-bullets.svg');
require('@phosphor-icons/core/assets/fill/list-bullets-fill.svg');
require('@phosphor-icons/core/assets/regular/list-checks.svg');
require('@phosphor-icons/core/assets/fill/list-checks-fill.svg');
require('@phosphor-icons/core/assets/regular/list-dashes.svg');
require('@phosphor-icons/core/assets/fill/list-dashes-fill.svg');
require('@phosphor-icons/core/assets/regular/list-magnifying-glass.svg');
require('@phosphor-icons/core/assets/fill/list-magnifying-glass-fill.svg');
require('@phosphor-icons/core/assets/regular/list-numbers.svg');
require('@phosphor-icons/core/assets/fill/list-numbers-fill.svg');
require('@phosphor-icons/core/assets/regular/list-plus.svg');
require('@phosphor-icons/core/assets/fill/list-plus-fill.svg');
require('@phosphor-icons/core/assets/regular/lock.svg');
require('@phosphor-icons/core/assets/fill/lock-fill.svg');
require('@phosphor-icons/core/assets/regular/lock-key.svg');
require('@phosphor-icons/core/assets/fill/lock-key-fill.svg');
require('@phosphor-icons/core/assets/regular/lock-key-open.svg');
require('@phosphor-icons/core/assets/fill/lock-key-open-fill.svg');
require('@phosphor-icons/core/assets/regular/lock-laminated.svg');
require('@phosphor-icons/core/assets/fill/lock-laminated-fill.svg');
require('@phosphor-icons/core/assets/regular/lock-laminated-open.svg');
require('@phosphor-icons/core/assets/fill/lock-laminated-open-fill.svg');
require('@phosphor-icons/core/assets/regular/lock-open.svg');
require('@phosphor-icons/core/assets/fill/lock-open-fill.svg');
require('@phosphor-icons/core/assets/regular/lock-simple.svg');
require('@phosphor-icons/core/assets/fill/lock-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/lock-simple-open.svg');
require('@phosphor-icons/core/assets/fill/lock-simple-open-fill.svg');
require('@phosphor-icons/core/assets/regular/lockers.svg');
require('@phosphor-icons/core/assets/fill/lockers-fill.svg');
require('@phosphor-icons/core/assets/regular/magic-wand.svg');
require('@phosphor-icons/core/assets/fill/magic-wand-fill.svg');
require('@phosphor-icons/core/assets/regular/magnet.svg');
require('@phosphor-icons/core/assets/fill/magnet-fill.svg');
require('@phosphor-icons/core/assets/regular/magnet-straight.svg');
require('@phosphor-icons/core/assets/fill/magnet-straight-fill.svg');
require('@phosphor-icons/core/assets/regular/magnifying-glass.svg');
require('@phosphor-icons/core/assets/fill/magnifying-glass-fill.svg');
require('@phosphor-icons/core/assets/regular/magnifying-glass-minus.svg');
require('@phosphor-icons/core/assets/fill/magnifying-glass-minus-fill.svg');
require('@phosphor-icons/core/assets/regular/magnifying-glass-plus.svg');
require('@phosphor-icons/core/assets/fill/magnifying-glass-plus-fill.svg');
require('@phosphor-icons/core/assets/regular/map-pin.svg');
require('@phosphor-icons/core/assets/fill/map-pin-fill.svg');
require('@phosphor-icons/core/assets/regular/map-pin-line.svg');
require('@phosphor-icons/core/assets/fill/map-pin-line-fill.svg');
require('@phosphor-icons/core/assets/regular/map-trifold.svg');
require('@phosphor-icons/core/assets/fill/map-trifold-fill.svg');
require('@phosphor-icons/core/assets/regular/marker-circle.svg');
require('@phosphor-icons/core/assets/fill/marker-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/martini.svg');
require('@phosphor-icons/core/assets/fill/martini-fill.svg');
require('@phosphor-icons/core/assets/regular/mask-happy.svg');
require('@phosphor-icons/core/assets/fill/mask-happy-fill.svg');
require('@phosphor-icons/core/assets/regular/mask-sad.svg');
require('@phosphor-icons/core/assets/fill/mask-sad-fill.svg');
require('@phosphor-icons/core/assets/regular/math-operations.svg');
require('@phosphor-icons/core/assets/fill/math-operations-fill.svg');
require('@phosphor-icons/core/assets/regular/medal.svg');
require('@phosphor-icons/core/assets/fill/medal-fill.svg');
require('@phosphor-icons/core/assets/regular/medal-military.svg');
require('@phosphor-icons/core/assets/fill/medal-military-fill.svg');
require('@phosphor-icons/core/assets/regular/medium-logo.svg');
require('@phosphor-icons/core/assets/fill/medium-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/megaphone.svg');
require('@phosphor-icons/core/assets/fill/megaphone-fill.svg');
require('@phosphor-icons/core/assets/regular/megaphone-simple.svg');
require('@phosphor-icons/core/assets/fill/megaphone-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/messenger-logo.svg');
require('@phosphor-icons/core/assets/fill/messenger-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/meta-logo.svg');
require('@phosphor-icons/core/assets/fill/meta-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/metronome.svg');
require('@phosphor-icons/core/assets/fill/metronome-fill.svg');
require('@phosphor-icons/core/assets/regular/microphone.svg');
require('@phosphor-icons/core/assets/fill/microphone-fill.svg');
require('@phosphor-icons/core/assets/regular/microphone-slash.svg');
require('@phosphor-icons/core/assets/fill/microphone-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/microphone-stage.svg');
require('@phosphor-icons/core/assets/fill/microphone-stage-fill.svg');
require('@phosphor-icons/core/assets/regular/microsoft-excel-logo.svg');
require('@phosphor-icons/core/assets/fill/microsoft-excel-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/microsoft-outlook-logo.svg');
require('@phosphor-icons/core/assets/fill/microsoft-outlook-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/microsoft-powerpoint-logo.svg');
require('@phosphor-icons/core/assets/fill/microsoft-powerpoint-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/microsoft-teams-logo.svg');
require('@phosphor-icons/core/assets/fill/microsoft-teams-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/microsoft-word-logo.svg');
require('@phosphor-icons/core/assets/fill/microsoft-word-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/minus.svg');
require('@phosphor-icons/core/assets/fill/minus-fill.svg');
require('@phosphor-icons/core/assets/regular/minus-circle.svg');
require('@phosphor-icons/core/assets/fill/minus-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/minus-square.svg');
require('@phosphor-icons/core/assets/fill/minus-square-fill.svg');
require('@phosphor-icons/core/assets/regular/money.svg');
require('@phosphor-icons/core/assets/fill/money-fill.svg');
require('@phosphor-icons/core/assets/regular/monitor.svg');
require('@phosphor-icons/core/assets/fill/monitor-fill.svg');
require('@phosphor-icons/core/assets/regular/monitor-play.svg');
require('@phosphor-icons/core/assets/fill/monitor-play-fill.svg');
require('@phosphor-icons/core/assets/regular/moon.svg');
require('@phosphor-icons/core/assets/fill/moon-fill.svg');
require('@phosphor-icons/core/assets/regular/moon-stars.svg');
require('@phosphor-icons/core/assets/fill/moon-stars-fill.svg');
require('@phosphor-icons/core/assets/regular/moped.svg');
require('@phosphor-icons/core/assets/fill/moped-fill.svg');
require('@phosphor-icons/core/assets/regular/moped-front.svg');
require('@phosphor-icons/core/assets/fill/moped-front-fill.svg');
require('@phosphor-icons/core/assets/regular/mosque.svg');
require('@phosphor-icons/core/assets/fill/mosque-fill.svg');
require('@phosphor-icons/core/assets/regular/motorcycle.svg');
require('@phosphor-icons/core/assets/fill/motorcycle-fill.svg');
require('@phosphor-icons/core/assets/regular/mountains.svg');
require('@phosphor-icons/core/assets/fill/mountains-fill.svg');
require('@phosphor-icons/core/assets/regular/mouse.svg');
require('@phosphor-icons/core/assets/fill/mouse-fill.svg');
require('@phosphor-icons/core/assets/regular/mouse-simple.svg');
require('@phosphor-icons/core/assets/fill/mouse-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/music-note.svg');
require('@phosphor-icons/core/assets/fill/music-note-fill.svg');
require('@phosphor-icons/core/assets/regular/music-note-simple.svg');
require('@phosphor-icons/core/assets/fill/music-note-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/music-notes.svg');
require('@phosphor-icons/core/assets/fill/music-notes-fill.svg');
require('@phosphor-icons/core/assets/regular/music-notes-plus.svg');
require('@phosphor-icons/core/assets/fill/music-notes-plus-fill.svg');
require('@phosphor-icons/core/assets/regular/music-notes-simple.svg');
require('@phosphor-icons/core/assets/fill/music-notes-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/navigation-arrow.svg');
require('@phosphor-icons/core/assets/fill/navigation-arrow-fill.svg');
require('@phosphor-icons/core/assets/regular/needle.svg');
require('@phosphor-icons/core/assets/fill/needle-fill.svg');
require('@phosphor-icons/core/assets/regular/newspaper.svg');
require('@phosphor-icons/core/assets/fill/newspaper-fill.svg');
require('@phosphor-icons/core/assets/regular/newspaper-clipping.svg');
require('@phosphor-icons/core/assets/fill/newspaper-clipping-fill.svg');
require('@phosphor-icons/core/assets/regular/notches.svg');
require('@phosphor-icons/core/assets/fill/notches-fill.svg');
require('@phosphor-icons/core/assets/regular/note.svg');
require('@phosphor-icons/core/assets/fill/note-fill.svg');
require('@phosphor-icons/core/assets/regular/note-blank.svg');
require('@phosphor-icons/core/assets/fill/note-blank-fill.svg');
require('@phosphor-icons/core/assets/regular/note-pencil.svg');
require('@phosphor-icons/core/assets/fill/note-pencil-fill.svg');
require('@phosphor-icons/core/assets/regular/notebook.svg');
require('@phosphor-icons/core/assets/fill/notebook-fill.svg');
require('@phosphor-icons/core/assets/regular/notepad.svg');
require('@phosphor-icons/core/assets/fill/notepad-fill.svg');
require('@phosphor-icons/core/assets/regular/notification.svg');
require('@phosphor-icons/core/assets/fill/notification-fill.svg');
require('@phosphor-icons/core/assets/regular/notion-logo.svg');
require('@phosphor-icons/core/assets/fill/notion-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/number-circle-eight.svg');
require('@phosphor-icons/core/assets/fill/number-circle-eight-fill.svg');
require('@phosphor-icons/core/assets/regular/number-circle-five.svg');
require('@phosphor-icons/core/assets/fill/number-circle-five-fill.svg');
require('@phosphor-icons/core/assets/regular/number-circle-four.svg');
require('@phosphor-icons/core/assets/fill/number-circle-four-fill.svg');
require('@phosphor-icons/core/assets/regular/number-circle-nine.svg');
require('@phosphor-icons/core/assets/fill/number-circle-nine-fill.svg');
require('@phosphor-icons/core/assets/regular/number-circle-one.svg');
require('@phosphor-icons/core/assets/fill/number-circle-one-fill.svg');
require('@phosphor-icons/core/assets/regular/number-circle-seven.svg');
require('@phosphor-icons/core/assets/fill/number-circle-seven-fill.svg');
require('@phosphor-icons/core/assets/regular/number-circle-six.svg');
require('@phosphor-icons/core/assets/fill/number-circle-six-fill.svg');
require('@phosphor-icons/core/assets/regular/number-circle-three.svg');
require('@phosphor-icons/core/assets/fill/number-circle-three-fill.svg');
require('@phosphor-icons/core/assets/regular/number-circle-two.svg');
require('@phosphor-icons/core/assets/fill/number-circle-two-fill.svg');
require('@phosphor-icons/core/assets/regular/number-circle-zero.svg');
require('@phosphor-icons/core/assets/fill/number-circle-zero-fill.svg');
require('@phosphor-icons/core/assets/regular/number-eight.svg');
require('@phosphor-icons/core/assets/fill/number-eight-fill.svg');
require('@phosphor-icons/core/assets/regular/number-five.svg');
require('@phosphor-icons/core/assets/fill/number-five-fill.svg');
require('@phosphor-icons/core/assets/regular/number-four.svg');
require('@phosphor-icons/core/assets/fill/number-four-fill.svg');
require('@phosphor-icons/core/assets/regular/number-nine.svg');
require('@phosphor-icons/core/assets/fill/number-nine-fill.svg');
require('@phosphor-icons/core/assets/regular/number-one.svg');
require('@phosphor-icons/core/assets/fill/number-one-fill.svg');
require('@phosphor-icons/core/assets/regular/number-seven.svg');
require('@phosphor-icons/core/assets/fill/number-seven-fill.svg');
require('@phosphor-icons/core/assets/regular/number-six.svg');
require('@phosphor-icons/core/assets/fill/number-six-fill.svg');
require('@phosphor-icons/core/assets/regular/number-square-eight.svg');
require('@phosphor-icons/core/assets/fill/number-square-eight-fill.svg');
require('@phosphor-icons/core/assets/regular/number-square-five.svg');
require('@phosphor-icons/core/assets/fill/number-square-five-fill.svg');
require('@phosphor-icons/core/assets/regular/number-square-four.svg');
require('@phosphor-icons/core/assets/fill/number-square-four-fill.svg');
require('@phosphor-icons/core/assets/regular/number-square-nine.svg');
require('@phosphor-icons/core/assets/fill/number-square-nine-fill.svg');
require('@phosphor-icons/core/assets/regular/number-square-one.svg');
require('@phosphor-icons/core/assets/fill/number-square-one-fill.svg');
require('@phosphor-icons/core/assets/regular/number-square-seven.svg');
require('@phosphor-icons/core/assets/fill/number-square-seven-fill.svg');
require('@phosphor-icons/core/assets/regular/number-square-six.svg');
require('@phosphor-icons/core/assets/fill/number-square-six-fill.svg');
require('@phosphor-icons/core/assets/regular/number-square-three.svg');
require('@phosphor-icons/core/assets/fill/number-square-three-fill.svg');
require('@phosphor-icons/core/assets/regular/number-square-two.svg');
require('@phosphor-icons/core/assets/fill/number-square-two-fill.svg');
require('@phosphor-icons/core/assets/regular/number-square-zero.svg');
require('@phosphor-icons/core/assets/fill/number-square-zero-fill.svg');
require('@phosphor-icons/core/assets/regular/number-three.svg');
require('@phosphor-icons/core/assets/fill/number-three-fill.svg');
require('@phosphor-icons/core/assets/regular/number-two.svg');
require('@phosphor-icons/core/assets/fill/number-two-fill.svg');
require('@phosphor-icons/core/assets/regular/number-zero.svg');
require('@phosphor-icons/core/assets/fill/number-zero-fill.svg');
require('@phosphor-icons/core/assets/regular/nut.svg');
require('@phosphor-icons/core/assets/fill/nut-fill.svg');
require('@phosphor-icons/core/assets/regular/ny-times-logo.svg');
require('@phosphor-icons/core/assets/fill/ny-times-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/octagon.svg');
require('@phosphor-icons/core/assets/fill/octagon-fill.svg');
require('@phosphor-icons/core/assets/regular/office-chair.svg');
require('@phosphor-icons/core/assets/fill/office-chair-fill.svg');
require('@phosphor-icons/core/assets/regular/option.svg');
require('@phosphor-icons/core/assets/fill/option-fill.svg');
require('@phosphor-icons/core/assets/regular/orange-slice.svg');
require('@phosphor-icons/core/assets/fill/orange-slice-fill.svg');
require('@phosphor-icons/core/assets/regular/package.svg');
require('@phosphor-icons/core/assets/fill/package-fill.svg');
require('@phosphor-icons/core/assets/regular/paint-brush.svg');
require('@phosphor-icons/core/assets/fill/paint-brush-fill.svg');
require('@phosphor-icons/core/assets/regular/paint-brush-broad.svg');
require('@phosphor-icons/core/assets/fill/paint-brush-broad-fill.svg');
require('@phosphor-icons/core/assets/regular/paint-brush-household.svg');
require('@phosphor-icons/core/assets/fill/paint-brush-household-fill.svg');
require('@phosphor-icons/core/assets/regular/paint-bucket.svg');
require('@phosphor-icons/core/assets/fill/paint-bucket-fill.svg');
require('@phosphor-icons/core/assets/regular/paint-roller.svg');
require('@phosphor-icons/core/assets/fill/paint-roller-fill.svg');
require('@phosphor-icons/core/assets/regular/palette.svg');
require('@phosphor-icons/core/assets/fill/palette-fill.svg');
require('@phosphor-icons/core/assets/regular/pants.svg');
require('@phosphor-icons/core/assets/fill/pants-fill.svg');
require('@phosphor-icons/core/assets/regular/paper-plane.svg');
require('@phosphor-icons/core/assets/fill/paper-plane-fill.svg');
require('@phosphor-icons/core/assets/regular/paper-plane-right.svg');
require('@phosphor-icons/core/assets/fill/paper-plane-right-fill.svg');
require('@phosphor-icons/core/assets/regular/paper-plane-tilt.svg');
require('@phosphor-icons/core/assets/fill/paper-plane-tilt-fill.svg');
require('@phosphor-icons/core/assets/regular/paperclip.svg');
require('@phosphor-icons/core/assets/fill/paperclip-fill.svg');
require('@phosphor-icons/core/assets/regular/paperclip-horizontal.svg');
require('@phosphor-icons/core/assets/fill/paperclip-horizontal-fill.svg');
require('@phosphor-icons/core/assets/regular/parachute.svg');
require('@phosphor-icons/core/assets/fill/parachute-fill.svg');
require('@phosphor-icons/core/assets/regular/paragraph.svg');
require('@phosphor-icons/core/assets/fill/paragraph-fill.svg');
require('@phosphor-icons/core/assets/regular/parallelogram.svg');
require('@phosphor-icons/core/assets/fill/parallelogram-fill.svg');
require('@phosphor-icons/core/assets/regular/park.svg');
require('@phosphor-icons/core/assets/fill/park-fill.svg');
require('@phosphor-icons/core/assets/regular/password.svg');
require('@phosphor-icons/core/assets/fill/password-fill.svg');
require('@phosphor-icons/core/assets/regular/path.svg');
require('@phosphor-icons/core/assets/fill/path-fill.svg');
require('@phosphor-icons/core/assets/regular/patreon-logo.svg');
require('@phosphor-icons/core/assets/fill/patreon-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/pause.svg');
require('@phosphor-icons/core/assets/fill/pause-fill.svg');
require('@phosphor-icons/core/assets/regular/pause-circle.svg');
require('@phosphor-icons/core/assets/fill/pause-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/paw-print.svg');
require('@phosphor-icons/core/assets/fill/paw-print-fill.svg');
require('@phosphor-icons/core/assets/regular/paypal-logo.svg');
require('@phosphor-icons/core/assets/fill/paypal-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/peace.svg');
require('@phosphor-icons/core/assets/fill/peace-fill.svg');
require('@phosphor-icons/core/assets/regular/pen.svg');
require('@phosphor-icons/core/assets/fill/pen-fill.svg');
require('@phosphor-icons/core/assets/regular/pen-nib.svg');
require('@phosphor-icons/core/assets/fill/pen-nib-fill.svg');
require('@phosphor-icons/core/assets/regular/pen-nib-straight.svg');
require('@phosphor-icons/core/assets/fill/pen-nib-straight-fill.svg');
require('@phosphor-icons/core/assets/regular/pencil.svg');
require('@phosphor-icons/core/assets/fill/pencil-fill.svg');
require('@phosphor-icons/core/assets/regular/pencil-circle.svg');
require('@phosphor-icons/core/assets/fill/pencil-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/pencil-line.svg');
require('@phosphor-icons/core/assets/fill/pencil-line-fill.svg');
require('@phosphor-icons/core/assets/regular/pencil-simple.svg');
require('@phosphor-icons/core/assets/fill/pencil-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/pencil-simple-line.svg');
require('@phosphor-icons/core/assets/fill/pencil-simple-line-fill.svg');
require('@phosphor-icons/core/assets/regular/pencil-simple-slash.svg');
require('@phosphor-icons/core/assets/fill/pencil-simple-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/pencil-slash.svg');
require('@phosphor-icons/core/assets/fill/pencil-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/pentagram.svg');
require('@phosphor-icons/core/assets/fill/pentagram-fill.svg');
require('@phosphor-icons/core/assets/regular/pepper.svg');
require('@phosphor-icons/core/assets/fill/pepper-fill.svg');
require('@phosphor-icons/core/assets/regular/percent.svg');
require('@phosphor-icons/core/assets/fill/percent-fill.svg');
require('@phosphor-icons/core/assets/regular/person.svg');
require('@phosphor-icons/core/assets/fill/person-fill.svg');
require('@phosphor-icons/core/assets/regular/person-arms-spread.svg');
require('@phosphor-icons/core/assets/fill/person-arms-spread-fill.svg');
require('@phosphor-icons/core/assets/regular/person-simple.svg');
require('@phosphor-icons/core/assets/fill/person-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/person-simple-bike.svg');
require('@phosphor-icons/core/assets/fill/person-simple-bike-fill.svg');
require('@phosphor-icons/core/assets/regular/person-simple-run.svg');
require('@phosphor-icons/core/assets/fill/person-simple-run-fill.svg');
require('@phosphor-icons/core/assets/regular/person-simple-throw.svg');
require('@phosphor-icons/core/assets/fill/person-simple-throw-fill.svg');
require('@phosphor-icons/core/assets/regular/person-simple-walk.svg');
require('@phosphor-icons/core/assets/fill/person-simple-walk-fill.svg');
require('@phosphor-icons/core/assets/regular/perspective.svg');
require('@phosphor-icons/core/assets/fill/perspective-fill.svg');
require('@phosphor-icons/core/assets/regular/phone.svg');
require('@phosphor-icons/core/assets/fill/phone-fill.svg');
require('@phosphor-icons/core/assets/regular/phone-call.svg');
require('@phosphor-icons/core/assets/fill/phone-call-fill.svg');
require('@phosphor-icons/core/assets/regular/phone-disconnect.svg');
require('@phosphor-icons/core/assets/fill/phone-disconnect-fill.svg');
require('@phosphor-icons/core/assets/regular/phone-incoming.svg');
require('@phosphor-icons/core/assets/fill/phone-incoming-fill.svg');
require('@phosphor-icons/core/assets/regular/phone-outgoing.svg');
require('@phosphor-icons/core/assets/fill/phone-outgoing-fill.svg');
require('@phosphor-icons/core/assets/regular/phone-plus.svg');
require('@phosphor-icons/core/assets/fill/phone-plus-fill.svg');
require('@phosphor-icons/core/assets/regular/phone-slash.svg');
require('@phosphor-icons/core/assets/fill/phone-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/phone-x.svg');
require('@phosphor-icons/core/assets/fill/phone-x-fill.svg');
require('@phosphor-icons/core/assets/regular/phosphor-logo.svg');
require('@phosphor-icons/core/assets/fill/phosphor-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/pi.svg');
require('@phosphor-icons/core/assets/fill/pi-fill.svg');
require('@phosphor-icons/core/assets/regular/piano-keys.svg');
require('@phosphor-icons/core/assets/fill/piano-keys-fill.svg');
require('@phosphor-icons/core/assets/regular/picture-in-picture.svg');
require('@phosphor-icons/core/assets/fill/picture-in-picture-fill.svg');
require('@phosphor-icons/core/assets/regular/piggy-bank.svg');
require('@phosphor-icons/core/assets/fill/piggy-bank-fill.svg');
require('@phosphor-icons/core/assets/regular/pill.svg');
require('@phosphor-icons/core/assets/fill/pill-fill.svg');
require('@phosphor-icons/core/assets/regular/pinterest-logo.svg');
require('@phosphor-icons/core/assets/fill/pinterest-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/pinwheel.svg');
require('@phosphor-icons/core/assets/fill/pinwheel-fill.svg');
require('@phosphor-icons/core/assets/regular/pizza.svg');
require('@phosphor-icons/core/assets/fill/pizza-fill.svg');
require('@phosphor-icons/core/assets/regular/placeholder.svg');
require('@phosphor-icons/core/assets/fill/placeholder-fill.svg');
require('@phosphor-icons/core/assets/regular/planet.svg');
require('@phosphor-icons/core/assets/fill/planet-fill.svg');
require('@phosphor-icons/core/assets/regular/plant.svg');
require('@phosphor-icons/core/assets/fill/plant-fill.svg');
require('@phosphor-icons/core/assets/regular/play.svg');
require('@phosphor-icons/core/assets/fill/play-fill.svg');
require('@phosphor-icons/core/assets/regular/play-circle.svg');
require('@phosphor-icons/core/assets/fill/play-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/play-pause.svg');
require('@phosphor-icons/core/assets/fill/play-pause-fill.svg');
require('@phosphor-icons/core/assets/regular/playlist.svg');
require('@phosphor-icons/core/assets/fill/playlist-fill.svg');
require('@phosphor-icons/core/assets/regular/plug.svg');
require('@phosphor-icons/core/assets/fill/plug-fill.svg');
require('@phosphor-icons/core/assets/regular/plug-charging.svg');
require('@phosphor-icons/core/assets/fill/plug-charging-fill.svg');
require('@phosphor-icons/core/assets/regular/plugs.svg');
require('@phosphor-icons/core/assets/fill/plugs-fill.svg');
require('@phosphor-icons/core/assets/regular/plugs-connected.svg');
require('@phosphor-icons/core/assets/fill/plugs-connected-fill.svg');
require('@phosphor-icons/core/assets/regular/plus.svg');
require('@phosphor-icons/core/assets/fill/plus-fill.svg');
require('@phosphor-icons/core/assets/regular/plus-circle.svg');
require('@phosphor-icons/core/assets/fill/plus-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/plus-minus.svg');
require('@phosphor-icons/core/assets/fill/plus-minus-fill.svg');
require('@phosphor-icons/core/assets/regular/plus-square.svg');
require('@phosphor-icons/core/assets/fill/plus-square-fill.svg');
require('@phosphor-icons/core/assets/regular/poker-chip.svg');
require('@phosphor-icons/core/assets/fill/poker-chip-fill.svg');
require('@phosphor-icons/core/assets/regular/police-car.svg');
require('@phosphor-icons/core/assets/fill/police-car-fill.svg');
require('@phosphor-icons/core/assets/regular/polygon.svg');
require('@phosphor-icons/core/assets/fill/polygon-fill.svg');
require('@phosphor-icons/core/assets/regular/popcorn.svg');
require('@phosphor-icons/core/assets/fill/popcorn-fill.svg');
require('@phosphor-icons/core/assets/regular/potted-plant.svg');
require('@phosphor-icons/core/assets/fill/potted-plant-fill.svg');
require('@phosphor-icons/core/assets/regular/power.svg');
require('@phosphor-icons/core/assets/fill/power-fill.svg');
require('@phosphor-icons/core/assets/regular/prescription.svg');
require('@phosphor-icons/core/assets/fill/prescription-fill.svg');
require('@phosphor-icons/core/assets/regular/presentation.svg');
require('@phosphor-icons/core/assets/fill/presentation-fill.svg');
require('@phosphor-icons/core/assets/regular/presentation-chart.svg');
require('@phosphor-icons/core/assets/fill/presentation-chart-fill.svg');
require('@phosphor-icons/core/assets/regular/printer.svg');
require('@phosphor-icons/core/assets/fill/printer-fill.svg');
require('@phosphor-icons/core/assets/regular/prohibit.svg');
require('@phosphor-icons/core/assets/fill/prohibit-fill.svg');
require('@phosphor-icons/core/assets/regular/prohibit-inset.svg');
require('@phosphor-icons/core/assets/fill/prohibit-inset-fill.svg');
require('@phosphor-icons/core/assets/regular/projector-screen.svg');
require('@phosphor-icons/core/assets/fill/projector-screen-fill.svg');
require('@phosphor-icons/core/assets/regular/projector-screen-chart.svg');
require('@phosphor-icons/core/assets/fill/projector-screen-chart-fill.svg');
require('@phosphor-icons/core/assets/regular/pulse.svg');
require('@phosphor-icons/core/assets/fill/pulse-fill.svg');
require('@phosphor-icons/core/assets/regular/push-pin.svg');
require('@phosphor-icons/core/assets/fill/push-pin-fill.svg');
require('@phosphor-icons/core/assets/regular/push-pin-simple.svg');
require('@phosphor-icons/core/assets/fill/push-pin-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/push-pin-simple-slash.svg');
require('@phosphor-icons/core/assets/fill/push-pin-simple-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/push-pin-slash.svg');
require('@phosphor-icons/core/assets/fill/push-pin-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/puzzle-piece.svg');
require('@phosphor-icons/core/assets/fill/puzzle-piece-fill.svg');
require('@phosphor-icons/core/assets/regular/qr-code.svg');
require('@phosphor-icons/core/assets/fill/qr-code-fill.svg');
require('@phosphor-icons/core/assets/regular/question.svg');
require('@phosphor-icons/core/assets/fill/question-fill.svg');
require('@phosphor-icons/core/assets/regular/queue.svg');
require('@phosphor-icons/core/assets/fill/queue-fill.svg');
require('@phosphor-icons/core/assets/regular/quotes.svg');
require('@phosphor-icons/core/assets/fill/quotes-fill.svg');
require('@phosphor-icons/core/assets/regular/radical.svg');
require('@phosphor-icons/core/assets/fill/radical-fill.svg');
require('@phosphor-icons/core/assets/regular/radio.svg');
require('@phosphor-icons/core/assets/fill/radio-fill.svg');
require('@phosphor-icons/core/assets/regular/radio-button.svg');
require('@phosphor-icons/core/assets/fill/radio-button-fill.svg');
require('@phosphor-icons/core/assets/regular/radioactive.svg');
require('@phosphor-icons/core/assets/fill/radioactive-fill.svg');
require('@phosphor-icons/core/assets/regular/rainbow.svg');
require('@phosphor-icons/core/assets/fill/rainbow-fill.svg');
require('@phosphor-icons/core/assets/regular/rainbow-cloud.svg');
require('@phosphor-icons/core/assets/fill/rainbow-cloud-fill.svg');
require('@phosphor-icons/core/assets/regular/read-cv-logo.svg');
require('@phosphor-icons/core/assets/fill/read-cv-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/receipt.svg');
require('@phosphor-icons/core/assets/fill/receipt-fill.svg');
require('@phosphor-icons/core/assets/regular/receipt-x.svg');
require('@phosphor-icons/core/assets/fill/receipt-x-fill.svg');
require('@phosphor-icons/core/assets/regular/record.svg');
require('@phosphor-icons/core/assets/fill/record-fill.svg');
require('@phosphor-icons/core/assets/regular/rectangle.svg');
require('@phosphor-icons/core/assets/fill/rectangle-fill.svg');
require('@phosphor-icons/core/assets/regular/recycle.svg');
require('@phosphor-icons/core/assets/fill/recycle-fill.svg');
require('@phosphor-icons/core/assets/regular/reddit-logo.svg');
require('@phosphor-icons/core/assets/fill/reddit-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/repeat.svg');
require('@phosphor-icons/core/assets/fill/repeat-fill.svg');
require('@phosphor-icons/core/assets/regular/repeat-once.svg');
require('@phosphor-icons/core/assets/fill/repeat-once-fill.svg');
require('@phosphor-icons/core/assets/regular/rewind.svg');
require('@phosphor-icons/core/assets/fill/rewind-fill.svg');
require('@phosphor-icons/core/assets/regular/rewind-circle.svg');
require('@phosphor-icons/core/assets/fill/rewind-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/road-horizon.svg');
require('@phosphor-icons/core/assets/fill/road-horizon-fill.svg');
require('@phosphor-icons/core/assets/regular/robot.svg');
require('@phosphor-icons/core/assets/fill/robot-fill.svg');
require('@phosphor-icons/core/assets/regular/rocket.svg');
require('@phosphor-icons/core/assets/fill/rocket-fill.svg');
require('@phosphor-icons/core/assets/regular/rocket-launch.svg');
require('@phosphor-icons/core/assets/fill/rocket-launch-fill.svg');
require('@phosphor-icons/core/assets/regular/rows.svg');
require('@phosphor-icons/core/assets/fill/rows-fill.svg');
require('@phosphor-icons/core/assets/regular/rss.svg');
require('@phosphor-icons/core/assets/fill/rss-fill.svg');
require('@phosphor-icons/core/assets/regular/rss-simple.svg');
require('@phosphor-icons/core/assets/fill/rss-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/rug.svg');
require('@phosphor-icons/core/assets/fill/rug-fill.svg');
require('@phosphor-icons/core/assets/regular/ruler.svg');
require('@phosphor-icons/core/assets/fill/ruler-fill.svg');
require('@phosphor-icons/core/assets/regular/scales.svg');
require('@phosphor-icons/core/assets/fill/scales-fill.svg');
require('@phosphor-icons/core/assets/regular/scan.svg');
require('@phosphor-icons/core/assets/fill/scan-fill.svg');
require('@phosphor-icons/core/assets/regular/scissors.svg');
require('@phosphor-icons/core/assets/fill/scissors-fill.svg');
require('@phosphor-icons/core/assets/regular/scooter.svg');
require('@phosphor-icons/core/assets/fill/scooter-fill.svg');
require('@phosphor-icons/core/assets/regular/screencast.svg');
require('@phosphor-icons/core/assets/fill/screencast-fill.svg');
require('@phosphor-icons/core/assets/regular/scribble-loop.svg');
require('@phosphor-icons/core/assets/fill/scribble-loop-fill.svg');
require('@phosphor-icons/core/assets/regular/scroll.svg');
require('@phosphor-icons/core/assets/fill/scroll-fill.svg');
require('@phosphor-icons/core/assets/regular/seal.svg');
require('@phosphor-icons/core/assets/fill/seal-fill.svg');
require('@phosphor-icons/core/assets/regular/seal-check.svg');
require('@phosphor-icons/core/assets/fill/seal-check-fill.svg');
require('@phosphor-icons/core/assets/regular/seal-question.svg');
require('@phosphor-icons/core/assets/fill/seal-question-fill.svg');
require('@phosphor-icons/core/assets/regular/seal-warning.svg');
require('@phosphor-icons/core/assets/fill/seal-warning-fill.svg');
require('@phosphor-icons/core/assets/regular/selection.svg');
require('@phosphor-icons/core/assets/fill/selection-fill.svg');
require('@phosphor-icons/core/assets/regular/selection-all.svg');
require('@phosphor-icons/core/assets/fill/selection-all-fill.svg');
require('@phosphor-icons/core/assets/regular/selection-background.svg');
require('@phosphor-icons/core/assets/fill/selection-background-fill.svg');
require('@phosphor-icons/core/assets/regular/selection-foreground.svg');
require('@phosphor-icons/core/assets/fill/selection-foreground-fill.svg');
require('@phosphor-icons/core/assets/regular/selection-inverse.svg');
require('@phosphor-icons/core/assets/fill/selection-inverse-fill.svg');
require('@phosphor-icons/core/assets/regular/selection-plus.svg');
require('@phosphor-icons/core/assets/fill/selection-plus-fill.svg');
require('@phosphor-icons/core/assets/regular/selection-slash.svg');
require('@phosphor-icons/core/assets/fill/selection-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/shapes.svg');
require('@phosphor-icons/core/assets/fill/shapes-fill.svg');
require('@phosphor-icons/core/assets/regular/share.svg');
require('@phosphor-icons/core/assets/fill/share-fill.svg');
require('@phosphor-icons/core/assets/regular/share-fat.svg');
require('@phosphor-icons/core/assets/fill/share-fat-fill.svg');
require('@phosphor-icons/core/assets/regular/share-network.svg');
require('@phosphor-icons/core/assets/fill/share-network-fill.svg');
require('@phosphor-icons/core/assets/regular/shield.svg');
require('@phosphor-icons/core/assets/fill/shield-fill.svg');
require('@phosphor-icons/core/assets/regular/shield-check.svg');
require('@phosphor-icons/core/assets/fill/shield-check-fill.svg');
require('@phosphor-icons/core/assets/regular/shield-checkered.svg');
require('@phosphor-icons/core/assets/fill/shield-checkered-fill.svg');
require('@phosphor-icons/core/assets/regular/shield-chevron.svg');
require('@phosphor-icons/core/assets/fill/shield-chevron-fill.svg');
require('@phosphor-icons/core/assets/regular/shield-plus.svg');
require('@phosphor-icons/core/assets/fill/shield-plus-fill.svg');
require('@phosphor-icons/core/assets/regular/shield-slash.svg');
require('@phosphor-icons/core/assets/fill/shield-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/shield-star.svg');
require('@phosphor-icons/core/assets/fill/shield-star-fill.svg');
require('@phosphor-icons/core/assets/regular/shield-warning.svg');
require('@phosphor-icons/core/assets/fill/shield-warning-fill.svg');
require('@phosphor-icons/core/assets/regular/shirt-folded.svg');
require('@phosphor-icons/core/assets/fill/shirt-folded-fill.svg');
require('@phosphor-icons/core/assets/regular/shooting-star.svg');
require('@phosphor-icons/core/assets/fill/shooting-star-fill.svg');
require('@phosphor-icons/core/assets/regular/shopping-bag.svg');
require('@phosphor-icons/core/assets/fill/shopping-bag-fill.svg');
require('@phosphor-icons/core/assets/regular/shopping-bag-open.svg');
require('@phosphor-icons/core/assets/fill/shopping-bag-open-fill.svg');
require('@phosphor-icons/core/assets/regular/shopping-cart.svg');
require('@phosphor-icons/core/assets/fill/shopping-cart-fill.svg');
require('@phosphor-icons/core/assets/regular/shopping-cart-simple.svg');
require('@phosphor-icons/core/assets/fill/shopping-cart-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/shower.svg');
require('@phosphor-icons/core/assets/fill/shower-fill.svg');
require('@phosphor-icons/core/assets/regular/shrimp.svg');
require('@phosphor-icons/core/assets/fill/shrimp-fill.svg');
require('@phosphor-icons/core/assets/regular/shuffle.svg');
require('@phosphor-icons/core/assets/fill/shuffle-fill.svg');
require('@phosphor-icons/core/assets/regular/shuffle-angular.svg');
require('@phosphor-icons/core/assets/fill/shuffle-angular-fill.svg');
require('@phosphor-icons/core/assets/regular/shuffle-simple.svg');
require('@phosphor-icons/core/assets/fill/shuffle-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/sidebar.svg');
require('@phosphor-icons/core/assets/fill/sidebar-fill.svg');
require('@phosphor-icons/core/assets/regular/sidebar-simple.svg');
require('@phosphor-icons/core/assets/fill/sidebar-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/sigma.svg');
require('@phosphor-icons/core/assets/fill/sigma-fill.svg');
require('@phosphor-icons/core/assets/regular/sign-in.svg');
require('@phosphor-icons/core/assets/fill/sign-in-fill.svg');
require('@phosphor-icons/core/assets/regular/sign-out.svg');
require('@phosphor-icons/core/assets/fill/sign-out-fill.svg');
require('@phosphor-icons/core/assets/regular/signature.svg');
require('@phosphor-icons/core/assets/fill/signature-fill.svg');
require('@phosphor-icons/core/assets/regular/signpost.svg');
require('@phosphor-icons/core/assets/fill/signpost-fill.svg');
require('@phosphor-icons/core/assets/regular/sim-card.svg');
require('@phosphor-icons/core/assets/fill/sim-card-fill.svg');
require('@phosphor-icons/core/assets/regular/siren.svg');
require('@phosphor-icons/core/assets/fill/siren-fill.svg');
require('@phosphor-icons/core/assets/regular/sketch-logo.svg');
require('@phosphor-icons/core/assets/fill/sketch-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/skip-back.svg');
require('@phosphor-icons/core/assets/fill/skip-back-fill.svg');
require('@phosphor-icons/core/assets/regular/skip-back-circle.svg');
require('@phosphor-icons/core/assets/fill/skip-back-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/skip-forward.svg');
require('@phosphor-icons/core/assets/fill/skip-forward-fill.svg');
require('@phosphor-icons/core/assets/regular/skip-forward-circle.svg');
require('@phosphor-icons/core/assets/fill/skip-forward-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/skull.svg');
require('@phosphor-icons/core/assets/fill/skull-fill.svg');
require('@phosphor-icons/core/assets/regular/slack-logo.svg');
require('@phosphor-icons/core/assets/fill/slack-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/sliders.svg');
require('@phosphor-icons/core/assets/fill/sliders-fill.svg');
require('@phosphor-icons/core/assets/regular/sliders-horizontal.svg');
require('@phosphor-icons/core/assets/fill/sliders-horizontal-fill.svg');
require('@phosphor-icons/core/assets/regular/slideshow.svg');
require('@phosphor-icons/core/assets/fill/slideshow-fill.svg');
require('@phosphor-icons/core/assets/regular/smiley.svg');
require('@phosphor-icons/core/assets/fill/smiley-fill.svg');
require('@phosphor-icons/core/assets/regular/smiley-angry.svg');
require('@phosphor-icons/core/assets/fill/smiley-angry-fill.svg');
require('@phosphor-icons/core/assets/regular/smiley-blank.svg');
require('@phosphor-icons/core/assets/fill/smiley-blank-fill.svg');
require('@phosphor-icons/core/assets/regular/smiley-meh.svg');
require('@phosphor-icons/core/assets/fill/smiley-meh-fill.svg');
require('@phosphor-icons/core/assets/regular/smiley-nervous.svg');
require('@phosphor-icons/core/assets/fill/smiley-nervous-fill.svg');
require('@phosphor-icons/core/assets/regular/smiley-sad.svg');
require('@phosphor-icons/core/assets/fill/smiley-sad-fill.svg');
require('@phosphor-icons/core/assets/regular/smiley-sticker.svg');
require('@phosphor-icons/core/assets/fill/smiley-sticker-fill.svg');
require('@phosphor-icons/core/assets/regular/smiley-wink.svg');
require('@phosphor-icons/core/assets/fill/smiley-wink-fill.svg');
require('@phosphor-icons/core/assets/regular/smiley-x-eyes.svg');
require('@phosphor-icons/core/assets/fill/smiley-x-eyes-fill.svg');
require('@phosphor-icons/core/assets/regular/snapchat-logo.svg');
require('@phosphor-icons/core/assets/fill/snapchat-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/sneaker.svg');
require('@phosphor-icons/core/assets/fill/sneaker-fill.svg');
require('@phosphor-icons/core/assets/regular/sneaker-move.svg');
require('@phosphor-icons/core/assets/fill/sneaker-move-fill.svg');
require('@phosphor-icons/core/assets/regular/snowflake.svg');
require('@phosphor-icons/core/assets/fill/snowflake-fill.svg');
require('@phosphor-icons/core/assets/regular/soccer-ball.svg');
require('@phosphor-icons/core/assets/fill/soccer-ball-fill.svg');
require('@phosphor-icons/core/assets/regular/sort-ascending.svg');
require('@phosphor-icons/core/assets/fill/sort-ascending-fill.svg');
require('@phosphor-icons/core/assets/regular/sort-descending.svg');
require('@phosphor-icons/core/assets/fill/sort-descending-fill.svg');
require('@phosphor-icons/core/assets/regular/soundcloud-logo.svg');
require('@phosphor-icons/core/assets/fill/soundcloud-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/spade.svg');
require('@phosphor-icons/core/assets/fill/spade-fill.svg');
require('@phosphor-icons/core/assets/regular/sparkle.svg');
require('@phosphor-icons/core/assets/fill/sparkle-fill.svg');
require('@phosphor-icons/core/assets/regular/speaker-hifi.svg');
require('@phosphor-icons/core/assets/fill/speaker-hifi-fill.svg');
require('@phosphor-icons/core/assets/regular/speaker-high.svg');
require('@phosphor-icons/core/assets/fill/speaker-high-fill.svg');
require('@phosphor-icons/core/assets/regular/speaker-low.svg');
require('@phosphor-icons/core/assets/fill/speaker-low-fill.svg');
require('@phosphor-icons/core/assets/regular/speaker-none.svg');
require('@phosphor-icons/core/assets/fill/speaker-none-fill.svg');
require('@phosphor-icons/core/assets/regular/speaker-simple-high.svg');
require('@phosphor-icons/core/assets/fill/speaker-simple-high-fill.svg');
require('@phosphor-icons/core/assets/regular/speaker-simple-low.svg');
require('@phosphor-icons/core/assets/fill/speaker-simple-low-fill.svg');
require('@phosphor-icons/core/assets/regular/speaker-simple-none.svg');
require('@phosphor-icons/core/assets/fill/speaker-simple-none-fill.svg');
require('@phosphor-icons/core/assets/regular/speaker-simple-slash.svg');
require('@phosphor-icons/core/assets/fill/speaker-simple-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/speaker-simple-x.svg');
require('@phosphor-icons/core/assets/fill/speaker-simple-x-fill.svg');
require('@phosphor-icons/core/assets/regular/speaker-slash.svg');
require('@phosphor-icons/core/assets/fill/speaker-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/speaker-x.svg');
require('@phosphor-icons/core/assets/fill/speaker-x-fill.svg');
require('@phosphor-icons/core/assets/regular/spinner.svg');
require('@phosphor-icons/core/assets/fill/spinner-fill.svg');
require('@phosphor-icons/core/assets/regular/spinner-gap.svg');
require('@phosphor-icons/core/assets/fill/spinner-gap-fill.svg');
require('@phosphor-icons/core/assets/regular/spiral.svg');
require('@phosphor-icons/core/assets/fill/spiral-fill.svg');
require('@phosphor-icons/core/assets/regular/split-horizontal.svg');
require('@phosphor-icons/core/assets/fill/split-horizontal-fill.svg');
require('@phosphor-icons/core/assets/regular/split-vertical.svg');
require('@phosphor-icons/core/assets/fill/split-vertical-fill.svg');
require('@phosphor-icons/core/assets/regular/spotify-logo.svg');
require('@phosphor-icons/core/assets/fill/spotify-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/square.svg');
require('@phosphor-icons/core/assets/fill/square-fill.svg');
require('@phosphor-icons/core/assets/regular/square-half.svg');
require('@phosphor-icons/core/assets/fill/square-half-fill.svg');
require('@phosphor-icons/core/assets/regular/square-half-bottom.svg');
require('@phosphor-icons/core/assets/fill/square-half-bottom-fill.svg');
require('@phosphor-icons/core/assets/regular/square-logo.svg');
require('@phosphor-icons/core/assets/fill/square-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/square-split-horizontal.svg');
require('@phosphor-icons/core/assets/fill/square-split-horizontal-fill.svg');
require('@phosphor-icons/core/assets/regular/square-split-vertical.svg');
require('@phosphor-icons/core/assets/fill/square-split-vertical-fill.svg');
require('@phosphor-icons/core/assets/regular/squares-four.svg');
require('@phosphor-icons/core/assets/fill/squares-four-fill.svg');
require('@phosphor-icons/core/assets/regular/stack.svg');
require('@phosphor-icons/core/assets/fill/stack-fill.svg');
require('@phosphor-icons/core/assets/regular/stack-overflow-logo.svg');
require('@phosphor-icons/core/assets/fill/stack-overflow-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/stack-simple.svg');
require('@phosphor-icons/core/assets/fill/stack-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/stairs.svg');
require('@phosphor-icons/core/assets/fill/stairs-fill.svg');
require('@phosphor-icons/core/assets/regular/stamp.svg');
require('@phosphor-icons/core/assets/fill/stamp-fill.svg');
require('@phosphor-icons/core/assets/regular/star.svg');
require('@phosphor-icons/core/assets/fill/star-fill.svg');
require('@phosphor-icons/core/assets/regular/star-and-crescent.svg');
require('@phosphor-icons/core/assets/fill/star-and-crescent-fill.svg');
require('@phosphor-icons/core/assets/regular/star-four.svg');
require('@phosphor-icons/core/assets/fill/star-four-fill.svg');
require('@phosphor-icons/core/assets/regular/star-half.svg');
require('@phosphor-icons/core/assets/fill/star-half-fill.svg');
require('@phosphor-icons/core/assets/regular/star-of-david.svg');
require('@phosphor-icons/core/assets/fill/star-of-david-fill.svg');
require('@phosphor-icons/core/assets/regular/steering-wheel.svg');
require('@phosphor-icons/core/assets/fill/steering-wheel-fill.svg');
require('@phosphor-icons/core/assets/regular/steps.svg');
require('@phosphor-icons/core/assets/fill/steps-fill.svg');
require('@phosphor-icons/core/assets/regular/stethoscope.svg');
require('@phosphor-icons/core/assets/fill/stethoscope-fill.svg');
require('@phosphor-icons/core/assets/regular/sticker.svg');
require('@phosphor-icons/core/assets/fill/sticker-fill.svg');
require('@phosphor-icons/core/assets/regular/stool.svg');
require('@phosphor-icons/core/assets/fill/stool-fill.svg');
require('@phosphor-icons/core/assets/regular/stop.svg');
require('@phosphor-icons/core/assets/fill/stop-fill.svg');
require('@phosphor-icons/core/assets/regular/stop-circle.svg');
require('@phosphor-icons/core/assets/fill/stop-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/storefront.svg');
require('@phosphor-icons/core/assets/fill/storefront-fill.svg');
require('@phosphor-icons/core/assets/regular/strategy.svg');
require('@phosphor-icons/core/assets/fill/strategy-fill.svg');
require('@phosphor-icons/core/assets/regular/stripe-logo.svg');
require('@phosphor-icons/core/assets/fill/stripe-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/student.svg');
require('@phosphor-icons/core/assets/fill/student-fill.svg');
require('@phosphor-icons/core/assets/regular/subtitles.svg');
require('@phosphor-icons/core/assets/fill/subtitles-fill.svg');
require('@phosphor-icons/core/assets/regular/subtract.svg');
require('@phosphor-icons/core/assets/fill/subtract-fill.svg');
require('@phosphor-icons/core/assets/regular/subtract-square.svg');
require('@phosphor-icons/core/assets/fill/subtract-square-fill.svg');
require('@phosphor-icons/core/assets/regular/suitcase.svg');
require('@phosphor-icons/core/assets/fill/suitcase-fill.svg');
require('@phosphor-icons/core/assets/regular/suitcase-rolling.svg');
require('@phosphor-icons/core/assets/fill/suitcase-rolling-fill.svg');
require('@phosphor-icons/core/assets/regular/suitcase-simple.svg');
require('@phosphor-icons/core/assets/fill/suitcase-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/sun.svg');
require('@phosphor-icons/core/assets/fill/sun-fill.svg');
require('@phosphor-icons/core/assets/regular/sun-dim.svg');
require('@phosphor-icons/core/assets/fill/sun-dim-fill.svg');
require('@phosphor-icons/core/assets/regular/sun-horizon.svg');
require('@phosphor-icons/core/assets/fill/sun-horizon-fill.svg');
require('@phosphor-icons/core/assets/regular/sunglasses.svg');
require('@phosphor-icons/core/assets/fill/sunglasses-fill.svg');
require('@phosphor-icons/core/assets/regular/swap.svg');
require('@phosphor-icons/core/assets/fill/swap-fill.svg');
require('@phosphor-icons/core/assets/regular/swatches.svg');
require('@phosphor-icons/core/assets/fill/swatches-fill.svg');
require('@phosphor-icons/core/assets/regular/swimming-pool.svg');
require('@phosphor-icons/core/assets/fill/swimming-pool-fill.svg');
require('@phosphor-icons/core/assets/regular/sword.svg');
require('@phosphor-icons/core/assets/fill/sword-fill.svg');
require('@phosphor-icons/core/assets/regular/synagogue.svg');
require('@phosphor-icons/core/assets/fill/synagogue-fill.svg');
require('@phosphor-icons/core/assets/regular/syringe.svg');
require('@phosphor-icons/core/assets/fill/syringe-fill.svg');
require('@phosphor-icons/core/assets/regular/t-shirt.svg');
require('@phosphor-icons/core/assets/fill/t-shirt-fill.svg');
require('@phosphor-icons/core/assets/regular/table.svg');
require('@phosphor-icons/core/assets/fill/table-fill.svg');
require('@phosphor-icons/core/assets/regular/tabs.svg');
require('@phosphor-icons/core/assets/fill/tabs-fill.svg');
require('@phosphor-icons/core/assets/regular/tag.svg');
require('@phosphor-icons/core/assets/fill/tag-fill.svg');
require('@phosphor-icons/core/assets/regular/tag-chevron.svg');
require('@phosphor-icons/core/assets/fill/tag-chevron-fill.svg');
require('@phosphor-icons/core/assets/regular/tag-simple.svg');
require('@phosphor-icons/core/assets/fill/tag-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/target.svg');
require('@phosphor-icons/core/assets/fill/target-fill.svg');
require('@phosphor-icons/core/assets/regular/taxi.svg');
require('@phosphor-icons/core/assets/fill/taxi-fill.svg');
require('@phosphor-icons/core/assets/regular/telegram-logo.svg');
require('@phosphor-icons/core/assets/fill/telegram-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/television.svg');
require('@phosphor-icons/core/assets/fill/television-fill.svg');
require('@phosphor-icons/core/assets/regular/television-simple.svg');
require('@phosphor-icons/core/assets/fill/television-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/tennis-ball.svg');
require('@phosphor-icons/core/assets/fill/tennis-ball-fill.svg');
require('@phosphor-icons/core/assets/regular/tent.svg');
require('@phosphor-icons/core/assets/fill/tent-fill.svg');
require('@phosphor-icons/core/assets/regular/terminal.svg');
require('@phosphor-icons/core/assets/fill/terminal-fill.svg');
require('@phosphor-icons/core/assets/regular/terminal-window.svg');
require('@phosphor-icons/core/assets/fill/terminal-window-fill.svg');
require('@phosphor-icons/core/assets/regular/test-tube.svg');
require('@phosphor-icons/core/assets/fill/test-tube-fill.svg');
require('@phosphor-icons/core/assets/regular/text-a-underline.svg');
require('@phosphor-icons/core/assets/fill/text-a-underline-fill.svg');
require('@phosphor-icons/core/assets/regular/text-aa.svg');
require('@phosphor-icons/core/assets/fill/text-aa-fill.svg');
require('@phosphor-icons/core/assets/regular/text-align-center.svg');
require('@phosphor-icons/core/assets/fill/text-align-center-fill.svg');
require('@phosphor-icons/core/assets/regular/text-align-justify.svg');
require('@phosphor-icons/core/assets/fill/text-align-justify-fill.svg');
require('@phosphor-icons/core/assets/regular/text-align-left.svg');
require('@phosphor-icons/core/assets/fill/text-align-left-fill.svg');
require('@phosphor-icons/core/assets/regular/text-align-right.svg');
require('@phosphor-icons/core/assets/fill/text-align-right-fill.svg');
require('@phosphor-icons/core/assets/regular/text-b.svg');
require('@phosphor-icons/core/assets/fill/text-b-fill.svg');
require('@phosphor-icons/core/assets/regular/text-columns.svg');
require('@phosphor-icons/core/assets/fill/text-columns-fill.svg');
require('@phosphor-icons/core/assets/regular/text-h.svg');
require('@phosphor-icons/core/assets/fill/text-h-fill.svg');
require('@phosphor-icons/core/assets/regular/text-h-five.svg');
require('@phosphor-icons/core/assets/fill/text-h-five-fill.svg');
require('@phosphor-icons/core/assets/regular/text-h-four.svg');
require('@phosphor-icons/core/assets/fill/text-h-four-fill.svg');
require('@phosphor-icons/core/assets/regular/text-h-one.svg');
require('@phosphor-icons/core/assets/fill/text-h-one-fill.svg');
require('@phosphor-icons/core/assets/regular/text-h-six.svg');
require('@phosphor-icons/core/assets/fill/text-h-six-fill.svg');
require('@phosphor-icons/core/assets/regular/text-h-three.svg');
require('@phosphor-icons/core/assets/fill/text-h-three-fill.svg');
require('@phosphor-icons/core/assets/regular/text-h-two.svg');
require('@phosphor-icons/core/assets/fill/text-h-two-fill.svg');
require('@phosphor-icons/core/assets/regular/text-indent.svg');
require('@phosphor-icons/core/assets/fill/text-indent-fill.svg');
require('@phosphor-icons/core/assets/regular/text-italic.svg');
require('@phosphor-icons/core/assets/fill/text-italic-fill.svg');
require('@phosphor-icons/core/assets/regular/text-outdent.svg');
require('@phosphor-icons/core/assets/fill/text-outdent-fill.svg');
require('@phosphor-icons/core/assets/regular/text-strikethrough.svg');
require('@phosphor-icons/core/assets/fill/text-strikethrough-fill.svg');
require('@phosphor-icons/core/assets/regular/text-t.svg');
require('@phosphor-icons/core/assets/fill/text-t-fill.svg');
require('@phosphor-icons/core/assets/regular/text-underline.svg');
require('@phosphor-icons/core/assets/fill/text-underline-fill.svg');
require('@phosphor-icons/core/assets/regular/textbox.svg');
require('@phosphor-icons/core/assets/fill/textbox-fill.svg');
require('@phosphor-icons/core/assets/regular/thermometer.svg');
require('@phosphor-icons/core/assets/fill/thermometer-fill.svg');
require('@phosphor-icons/core/assets/regular/thermometer-cold.svg');
require('@phosphor-icons/core/assets/fill/thermometer-cold-fill.svg');
require('@phosphor-icons/core/assets/regular/thermometer-hot.svg');
require('@phosphor-icons/core/assets/fill/thermometer-hot-fill.svg');
require('@phosphor-icons/core/assets/regular/thermometer-simple.svg');
require('@phosphor-icons/core/assets/fill/thermometer-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/thumbs-down.svg');
require('@phosphor-icons/core/assets/fill/thumbs-down-fill.svg');
require('@phosphor-icons/core/assets/regular/thumbs-up.svg');
require('@phosphor-icons/core/assets/fill/thumbs-up-fill.svg');
require('@phosphor-icons/core/assets/regular/ticket.svg');
require('@phosphor-icons/core/assets/fill/ticket-fill.svg');
require('@phosphor-icons/core/assets/regular/tidal-logo.svg');
require('@phosphor-icons/core/assets/fill/tidal-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/tiktok-logo.svg');
require('@phosphor-icons/core/assets/fill/tiktok-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/timer.svg');
require('@phosphor-icons/core/assets/fill/timer-fill.svg');
require('@phosphor-icons/core/assets/regular/tipi.svg');
require('@phosphor-icons/core/assets/fill/tipi-fill.svg');
require('@phosphor-icons/core/assets/regular/toggle-left.svg');
require('@phosphor-icons/core/assets/fill/toggle-left-fill.svg');
require('@phosphor-icons/core/assets/regular/toggle-right.svg');
require('@phosphor-icons/core/assets/fill/toggle-right-fill.svg');
require('@phosphor-icons/core/assets/regular/toilet.svg');
require('@phosphor-icons/core/assets/fill/toilet-fill.svg');
require('@phosphor-icons/core/assets/regular/toilet-paper.svg');
require('@phosphor-icons/core/assets/fill/toilet-paper-fill.svg');
require('@phosphor-icons/core/assets/regular/toolbox.svg');
require('@phosphor-icons/core/assets/fill/toolbox-fill.svg');
require('@phosphor-icons/core/assets/regular/tooth.svg');
require('@phosphor-icons/core/assets/fill/tooth-fill.svg');
require('@phosphor-icons/core/assets/regular/tote.svg');
require('@phosphor-icons/core/assets/fill/tote-fill.svg');
require('@phosphor-icons/core/assets/regular/tote-simple.svg');
require('@phosphor-icons/core/assets/fill/tote-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/trademark.svg');
require('@phosphor-icons/core/assets/fill/trademark-fill.svg');
require('@phosphor-icons/core/assets/regular/trademark-registered.svg');
require('@phosphor-icons/core/assets/fill/trademark-registered-fill.svg');
require('@phosphor-icons/core/assets/regular/traffic-cone.svg');
require('@phosphor-icons/core/assets/fill/traffic-cone-fill.svg');
require('@phosphor-icons/core/assets/regular/traffic-sign.svg');
require('@phosphor-icons/core/assets/fill/traffic-sign-fill.svg');
require('@phosphor-icons/core/assets/regular/traffic-signal.svg');
require('@phosphor-icons/core/assets/fill/traffic-signal-fill.svg');
require('@phosphor-icons/core/assets/regular/train.svg');
require('@phosphor-icons/core/assets/fill/train-fill.svg');
require('@phosphor-icons/core/assets/regular/train-regional.svg');
require('@phosphor-icons/core/assets/fill/train-regional-fill.svg');
require('@phosphor-icons/core/assets/regular/train-simple.svg');
require('@phosphor-icons/core/assets/fill/train-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/tram.svg');
require('@phosphor-icons/core/assets/fill/tram-fill.svg');
require('@phosphor-icons/core/assets/regular/translate.svg');
require('@phosphor-icons/core/assets/fill/translate-fill.svg');
require('@phosphor-icons/core/assets/regular/trash.svg');
require('@phosphor-icons/core/assets/fill/trash-fill.svg');
require('@phosphor-icons/core/assets/regular/trash-simple.svg');
require('@phosphor-icons/core/assets/fill/trash-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/tray.svg');
require('@phosphor-icons/core/assets/fill/tray-fill.svg');
require('@phosphor-icons/core/assets/regular/tree.svg');
require('@phosphor-icons/core/assets/fill/tree-fill.svg');
require('@phosphor-icons/core/assets/regular/tree-evergreen.svg');
require('@phosphor-icons/core/assets/fill/tree-evergreen-fill.svg');
require('@phosphor-icons/core/assets/regular/tree-palm.svg');
require('@phosphor-icons/core/assets/fill/tree-palm-fill.svg');
require('@phosphor-icons/core/assets/regular/tree-structure.svg');
require('@phosphor-icons/core/assets/fill/tree-structure-fill.svg');
require('@phosphor-icons/core/assets/regular/trend-down.svg');
require('@phosphor-icons/core/assets/fill/trend-down-fill.svg');
require('@phosphor-icons/core/assets/regular/trend-up.svg');
require('@phosphor-icons/core/assets/fill/trend-up-fill.svg');
require('@phosphor-icons/core/assets/regular/triangle.svg');
require('@phosphor-icons/core/assets/fill/triangle-fill.svg');
require('@phosphor-icons/core/assets/regular/trophy.svg');
require('@phosphor-icons/core/assets/fill/trophy-fill.svg');
require('@phosphor-icons/core/assets/regular/truck.svg');
require('@phosphor-icons/core/assets/fill/truck-fill.svg');
require('@phosphor-icons/core/assets/regular/twitch-logo.svg');
require('@phosphor-icons/core/assets/fill/twitch-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/twitter-logo.svg');
require('@phosphor-icons/core/assets/fill/twitter-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/umbrella.svg');
require('@phosphor-icons/core/assets/fill/umbrella-fill.svg');
require('@phosphor-icons/core/assets/regular/umbrella-simple.svg');
require('@phosphor-icons/core/assets/fill/umbrella-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/unite.svg');
require('@phosphor-icons/core/assets/fill/unite-fill.svg');
require('@phosphor-icons/core/assets/regular/unite-square.svg');
require('@phosphor-icons/core/assets/fill/unite-square-fill.svg');
require('@phosphor-icons/core/assets/regular/upload.svg');
require('@phosphor-icons/core/assets/fill/upload-fill.svg');
require('@phosphor-icons/core/assets/regular/upload-simple.svg');
require('@phosphor-icons/core/assets/fill/upload-simple-fill.svg');
require('@phosphor-icons/core/assets/regular/usb.svg');
require('@phosphor-icons/core/assets/fill/usb-fill.svg');
require('@phosphor-icons/core/assets/regular/user.svg');
require('@phosphor-icons/core/assets/fill/user-fill.svg');
require('@phosphor-icons/core/assets/regular/user-circle.svg');
require('@phosphor-icons/core/assets/fill/user-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/user-circle-gear.svg');
require('@phosphor-icons/core/assets/fill/user-circle-gear-fill.svg');
require('@phosphor-icons/core/assets/regular/user-circle-minus.svg');
require('@phosphor-icons/core/assets/fill/user-circle-minus-fill.svg');
require('@phosphor-icons/core/assets/regular/user-circle-plus.svg');
require('@phosphor-icons/core/assets/fill/user-circle-plus-fill.svg');
require('@phosphor-icons/core/assets/regular/user-focus.svg');
require('@phosphor-icons/core/assets/fill/user-focus-fill.svg');
require('@phosphor-icons/core/assets/regular/user-gear.svg');
require('@phosphor-icons/core/assets/fill/user-gear-fill.svg');
require('@phosphor-icons/core/assets/regular/user-list.svg');
require('@phosphor-icons/core/assets/fill/user-list-fill.svg');
require('@phosphor-icons/core/assets/regular/user-minus.svg');
require('@phosphor-icons/core/assets/fill/user-minus-fill.svg');
require('@phosphor-icons/core/assets/regular/user-plus.svg');
require('@phosphor-icons/core/assets/fill/user-plus-fill.svg');
require('@phosphor-icons/core/assets/regular/user-rectangle.svg');
require('@phosphor-icons/core/assets/fill/user-rectangle-fill.svg');
require('@phosphor-icons/core/assets/regular/user-square.svg');
require('@phosphor-icons/core/assets/fill/user-square-fill.svg');
require('@phosphor-icons/core/assets/regular/user-switch.svg');
require('@phosphor-icons/core/assets/fill/user-switch-fill.svg');
require('@phosphor-icons/core/assets/regular/users.svg');
require('@phosphor-icons/core/assets/fill/users-fill.svg');
require('@phosphor-icons/core/assets/regular/users-four.svg');
require('@phosphor-icons/core/assets/fill/users-four-fill.svg');
require('@phosphor-icons/core/assets/regular/users-three.svg');
require('@phosphor-icons/core/assets/fill/users-three-fill.svg');
require('@phosphor-icons/core/assets/regular/van.svg');
require('@phosphor-icons/core/assets/fill/van-fill.svg');
require('@phosphor-icons/core/assets/regular/vault.svg');
require('@phosphor-icons/core/assets/fill/vault-fill.svg');
require('@phosphor-icons/core/assets/regular/vibrate.svg');
require('@phosphor-icons/core/assets/fill/vibrate-fill.svg');
require('@phosphor-icons/core/assets/regular/video.svg');
require('@phosphor-icons/core/assets/fill/video-fill.svg');
require('@phosphor-icons/core/assets/regular/video-camera.svg');
require('@phosphor-icons/core/assets/fill/video-camera-fill.svg');
require('@phosphor-icons/core/assets/regular/video-camera-slash.svg');
require('@phosphor-icons/core/assets/fill/video-camera-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/vignette.svg');
require('@phosphor-icons/core/assets/fill/vignette-fill.svg');
require('@phosphor-icons/core/assets/regular/vinyl-record.svg');
require('@phosphor-icons/core/assets/fill/vinyl-record-fill.svg');
require('@phosphor-icons/core/assets/regular/virtual-reality.svg');
require('@phosphor-icons/core/assets/fill/virtual-reality-fill.svg');
require('@phosphor-icons/core/assets/regular/virus.svg');
require('@phosphor-icons/core/assets/fill/virus-fill.svg');
require('@phosphor-icons/core/assets/regular/voicemail.svg');
require('@phosphor-icons/core/assets/fill/voicemail-fill.svg');
require('@phosphor-icons/core/assets/regular/volleyball.svg');
require('@phosphor-icons/core/assets/fill/volleyball-fill.svg');
require('@phosphor-icons/core/assets/regular/wall.svg');
require('@phosphor-icons/core/assets/fill/wall-fill.svg');
require('@phosphor-icons/core/assets/regular/wallet.svg');
require('@phosphor-icons/core/assets/fill/wallet-fill.svg');
require('@phosphor-icons/core/assets/regular/warehouse.svg');
require('@phosphor-icons/core/assets/fill/warehouse-fill.svg');
const warning_svg = require('@phosphor-icons/core/assets/regular/warning.svg');
require('@phosphor-icons/core/assets/fill/warning-fill.svg');
const warningCircle_svg = require('@phosphor-icons/core/assets/regular/warning-circle.svg');
require('@phosphor-icons/core/assets/fill/warning-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/warning-diamond.svg');
require('@phosphor-icons/core/assets/fill/warning-diamond-fill.svg');
require('@phosphor-icons/core/assets/regular/warning-octagon.svg');
require('@phosphor-icons/core/assets/fill/warning-octagon-fill.svg');
require('@phosphor-icons/core/assets/regular/watch.svg');
require('@phosphor-icons/core/assets/fill/watch-fill.svg');
require('@phosphor-icons/core/assets/regular/wave-sawtooth.svg');
require('@phosphor-icons/core/assets/fill/wave-sawtooth-fill.svg');
require('@phosphor-icons/core/assets/regular/wave-sine.svg');
require('@phosphor-icons/core/assets/fill/wave-sine-fill.svg');
require('@phosphor-icons/core/assets/regular/wave-square.svg');
require('@phosphor-icons/core/assets/fill/wave-square-fill.svg');
require('@phosphor-icons/core/assets/regular/wave-triangle.svg');
require('@phosphor-icons/core/assets/fill/wave-triangle-fill.svg');
require('@phosphor-icons/core/assets/regular/waveform.svg');
require('@phosphor-icons/core/assets/fill/waveform-fill.svg');
require('@phosphor-icons/core/assets/regular/waves.svg');
require('@phosphor-icons/core/assets/fill/waves-fill.svg');
require('@phosphor-icons/core/assets/regular/webcam.svg');
require('@phosphor-icons/core/assets/fill/webcam-fill.svg');
require('@phosphor-icons/core/assets/regular/webcam-slash.svg');
require('@phosphor-icons/core/assets/fill/webcam-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/webhooks-logo.svg');
require('@phosphor-icons/core/assets/fill/webhooks-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/wechat-logo.svg');
require('@phosphor-icons/core/assets/fill/wechat-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/whatsapp-logo.svg');
require('@phosphor-icons/core/assets/fill/whatsapp-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/wheelchair.svg');
require('@phosphor-icons/core/assets/fill/wheelchair-fill.svg');
require('@phosphor-icons/core/assets/regular/wheelchair-motion.svg');
require('@phosphor-icons/core/assets/fill/wheelchair-motion-fill.svg');
require('@phosphor-icons/core/assets/regular/wifi-high.svg');
require('@phosphor-icons/core/assets/fill/wifi-high-fill.svg');
require('@phosphor-icons/core/assets/regular/wifi-low.svg');
require('@phosphor-icons/core/assets/fill/wifi-low-fill.svg');
require('@phosphor-icons/core/assets/regular/wifi-medium.svg');
require('@phosphor-icons/core/assets/fill/wifi-medium-fill.svg');
require('@phosphor-icons/core/assets/regular/wifi-none.svg');
require('@phosphor-icons/core/assets/fill/wifi-none-fill.svg');
require('@phosphor-icons/core/assets/regular/wifi-slash.svg');
require('@phosphor-icons/core/assets/fill/wifi-slash-fill.svg');
require('@phosphor-icons/core/assets/regular/wifi-x.svg');
require('@phosphor-icons/core/assets/fill/wifi-x-fill.svg');
require('@phosphor-icons/core/assets/regular/wind.svg');
require('@phosphor-icons/core/assets/fill/wind-fill.svg');
require('@phosphor-icons/core/assets/regular/windows-logo.svg');
require('@phosphor-icons/core/assets/fill/windows-logo-fill.svg');
require('@phosphor-icons/core/assets/regular/wine.svg');
require('@phosphor-icons/core/assets/fill/wine-fill.svg');
require('@phosphor-icons/core/assets/regular/wrench.svg');
require('@phosphor-icons/core/assets/fill/wrench-fill.svg');
const x_svg = require('@phosphor-icons/core/assets/regular/x.svg');
require('@phosphor-icons/core/assets/fill/x-fill.svg');
require('@phosphor-icons/core/assets/regular/x-circle.svg');
require('@phosphor-icons/core/assets/fill/x-circle-fill.svg');
require('@phosphor-icons/core/assets/regular/x-square.svg');
require('@phosphor-icons/core/assets/fill/x-square-fill.svg');
require('@phosphor-icons/core/assets/regular/yin-yang.svg');
require('@phosphor-icons/core/assets/fill/yin-yang-fill.svg');
require('@phosphor-icons/core/assets/regular/youtube-logo.svg');
require('@phosphor-icons/core/assets/fill/youtube-logo-fill.svg');
const reactNative = require('react-native');

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

const Frame = core.styled(core.View, {
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
  const style = core.useStyle({
    color
    // if needed for native
    // resolveValues: Platform.OS === 'web' ? undefined: 'value',
  });
  return /* @__PURE__ */ jsxRuntime.jsx(
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

const Pressable = core.styled(Frame, {
  interactive: true
});

const IconButtonFrame = core.styled(Pressable, {
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
  return /* @__PURE__ */ jsxRuntime.jsx(IconButtonFrame, { size, disabled, ...pressableProps, children: /* @__PURE__ */ jsxRuntime.jsx(
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
const Stack = core.styled(core.View, {
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
const HStack = core.styled(Stack, {
  name: "HStack",
  flexDirection: "row",
  variants
});
const VStack = core.styled(Stack, {
  name: "VStack",
  flexDirection: "column"
});

const Typography = core.styled(core.Text, {
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
const TypographyParagraph = core.styled(Typography, {
  name: "TypographyParagraph",
  tag: "p",
  userSelect: "auto",
  family: "body"
});
const TypographySizeContext = react.createContext(void 0);
const TypographyWithContext = Typography.styleable(
  ({ size, ...props }, ref) => {
    const ancestorSize = react.useContext(TypographySizeContext);
    const sizeOrAncestorSizeOrDefaultSize = size || ancestorSize;
    if (sizeOrAncestorSizeOrDefaultSize !== size) {
      return /* @__PURE__ */ jsxRuntime.jsx(TypographySizeContext.Provider, { value: sizeOrAncestorSizeOrDefaultSize, children: /* @__PURE__ */ jsxRuntime.jsx(Typography, { ref, size, ...props }) });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(Typography, { ref, size, ...props });
  }
);
const TypographyParagraphWithContext = TypographyParagraph.styleable(
  ({ size, ...props }, ref) => {
    const ancestorSize = react.useContext(TypographySizeContext);
    const sizeOrAncestorSizeOrDefaultSize = size || ancestorSize;
    return /* @__PURE__ */ jsxRuntime.jsx(TypographySizeContext.Provider, { value: sizeOrAncestorSizeOrDefaultSize, children: /* @__PURE__ */ jsxRuntime.jsx(Typography, { ref, size, ...props }) });
  }
);

const ButtonFrame = core.styled(Pressable, {
  name: "ButtonFrame",
  role: "button",
  centered: true,
  minHeight: 42,
  borderWidth: 1,
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
  return /* @__PURE__ */ jsxRuntime.jsx(ButtonFrame, { disabled, variant, ...pressableProps, children: /* @__PURE__ */ jsxRuntime.jsxs(HStack, { gap: "$xs", alignItems: "center", children: [
    icon && /* @__PURE__ */ jsxRuntime.jsx(
      Icon,
      {
        color: disabled ? "$contrastDisabled" : void 0,
        contrast: variant === "contained" && !disabled,
        icon
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
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
      return /* @__PURE__ */ jsxRuntime.jsx(warningCircle_svg.ReactComponent, {});
    case "success":
      return /* @__PURE__ */ jsxRuntime.jsx(check_svg.ReactComponent, {});
    case "danger":
      return /* @__PURE__ */ jsxRuntime.jsx(warning_svg.ReactComponent, {});
    default:
      return /* @__PURE__ */ jsxRuntime.jsx(info_svg.ReactComponent, {});
  }
}

const MessageFrame = core.styled(Frame, {
  name: "MessageFrame",
  alignItems: "center",
  withBackground: true,
  borderRadius: "$md",
  paddingHorizontal: "$4",
  flexDirection: "row",
  gap: "$4"
});
const MessageText = core.styled(Typography, {
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
const MessageIconContainer = core.styled(core.View, {
  name: "MessageIconContainer",
  alignItems: "center"
});
const MessageDismissButtonContainer = core.styled(core.View, {
  name: "MessageDismissButtonContainer",
  marginRight: "$2"
});
function Message({
  theme,
  textCentered,
  children,
  onDismiss
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(MessageFrame, { theme, children: [
    textCentered ? null : /* @__PURE__ */ jsxRuntime.jsx(MessageIconContainer, { children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { contrast: true, icon: /* @__PURE__ */ jsxRuntime.jsx(FeedbackIcon, { type: theme }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(MessageText, { centered: textCentered, children }),
    onDismiss ? /* @__PURE__ */ jsxRuntime.jsx(MessageDismissButtonContainer, { children: /* @__PURE__ */ jsxRuntime.jsx(IconButton, { icon: /* @__PURE__ */ jsxRuntime.jsx(x_svg.ReactComponent, {}), size: 40 }) }) : null
  ] });
}

const StyledInputText = core.styled(reactNative.TextInput, {
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
const InputText = core.styled(StyledInputText, {
  name: "InputText",
  interactive: "text",
  theme: "primary"
  // animation: "formElement", // remove all style ?
});
core.styled(InputText, {
  multiline: true
});

const ScrollView = core.styled(
  reactNative.ScrollView,
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

const StoryTitle = core.styled(Typography, {
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

const InternalStorySection = core.styled(VStack, {
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
  return /* @__PURE__ */ jsxRuntime.jsxs(InternalStorySection, { withBackground, ...props, children: [
    /* @__PURE__ */ jsxRuntime.jsx(StoryTitle, { level: level + 1, children: title }),
    children
  ] });
}
function SubSection({
  title,
  children,
  withBackground,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    InternalStorySection,
    {
      marginBottom: "$4",
      withBackground,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(StoryTitle, { level: 3, children: title }),
        children
      ]
    }
  );
}
function Story({ preview, children }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    preview && /* @__PURE__ */ jsxRuntime.jsx(StorySection, { title: "Preview", paddingBottom: "$12", children: preview }),
    children
  ] });
}
Story.Section = StorySection;
Story.SubSection = SubSection;

function StoryContainer({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(ScrollView, { theme: "light", background: "#fff", padding: "$4", children: [
    /* @__PURE__ */ jsxRuntime.jsx(StoryTitle, { level: 1, children: title }),
    children
  ] });
}

const StoryDecorator = (storyFn, { name, container }) => {
  if (container === false) return storyFn();
  return /* @__PURE__ */ jsxRuntime.jsx(StoryContainer, { title: name, children: storyFn() });
};

function StoryGridRow({
  children,
  breakpoint = "small",
  flexWrap
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    core.View,
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
      children: react.Children.map(children, (child) => /* @__PURE__ */ jsxRuntime.jsx(
        core.View,
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
  const isNative = reactNative.Platform.OS === "ios" || reactNative.Platform.OS === "android";
  if (reactNative.Platform.OS === "web" && platform === "native") {
    return null;
  }
  if (isNative && platform === "web") {
    return null;
  }
  return title ? /* @__PURE__ */ jsxRuntime.jsxs(VStack, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(StoryTitle, { level: 4, numberOfLines: 1, children: title }),
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
  const config = core.useConfiguration();
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
  const media = core.useMedia();
  if (media.wide) return BreakpointNameEnum.WIDE;
  if (media.large) return BreakpointNameEnum.LARGE;
  if (media.medium) return BreakpointNameEnum.MEDIUM;
  if (media.small) return BreakpointNameEnum.SMALL;
  return BreakpointNameEnum.BASE;
}
function useCurrentBreakpointNameFiltered(names) {
  const media = core.useMedia();
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
    return /* @__PURE__ */ jsxRuntime.jsx(
      core.View,
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
  return /* @__PURE__ */ jsxRuntime.jsx(core.TamaguiProvider, { config: tamaguiConfig, defaultTheme: "light", children });
}

const AlouetteDecorator = (storyFn, context) => /* @__PURE__ */ jsxRuntime.jsx(AlouetteProvider, { tamaguiConfig: context.parameters.tamaguiConfig, children: storyFn(context) });

exports.Theme = core.Theme;
exports.View = core.View;
exports.AlouetteDecorator = AlouetteDecorator;
exports.AlouetteProvider = AlouetteProvider;
exports.Button = Button;
exports.Frame = Frame;
exports.HStack = HStack;
exports.Icon = Icon;
exports.IconButton = IconButton;
exports.InputText = InputText;
exports.Message = Message;
exports.Pressable = Pressable;
exports.ScrollView = ScrollView;
exports.Stack = Stack;
exports.Story = Story;
exports.StoryContainer = StoryContainer;
exports.StoryDecorator = StoryDecorator;
exports.StoryGrid = StoryGrid;
exports.StoryTitle = StoryTitle;
exports.SwitchBreakpointsUsingDisplayNone = SwitchBreakpointsUsingDisplayNone;
exports.SwitchBreakpointsUsingNull = SwitchBreakpointsUsingNull;
exports.Typography = Typography;
exports.TypographyParagraph = TypographyParagraph;
exports.TypographyParagraphWithContext = TypographyParagraphWithContext;
exports.TypographyWithContext = TypographyWithContext;
exports.VStack = VStack;
exports.WithTamaguiConfig = WithTamaguiConfig;
exports.useCurrentBreakpointName = useCurrentBreakpointName;
//# sourceMappingURL=index-react-native.cjs.js.map
