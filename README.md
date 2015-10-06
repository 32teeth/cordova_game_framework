#pixel games builder
----
```
# navigate to directory
#----------------
cd [directory]

# create cordova project
#----------------
cordova create pixel-[game] com.fakesite.[game] pixel-[game]

# add plugins
#----------------
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-console
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-game-center
cordova plugin add cordova-plugin-admobpro
cordova plugin add org.pushandplay.cordova.apprate

#device motion
#----------------
cordova plugin add org.apache.cordova.device-motion
```

at this stage you will want to copy the www folder into the cordova projects folder and work there


```
#platforms
#----------------
cordova platform add ios
cordova platform add android

#prepare
#----------------
cordova prepare ios
cordova prepare android

#build (use xCode for iOS)
#----------------
cordova build android --release

##android only
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore 
[path]/pixelgames.keystore 
[path to game]/platforms/android/build/outputs/apk/android-release-unsigned.apk pixelgames

zipalign [path to android apk]/Android\ SDK/build-tools/23.0.0/zipalign  -v 4 
[path to game]/platforms/android/build/outputs/apk/android-release-unsigned.apk 
[path to game]/platforms/android/build/outputs/apk/android-release.apk

```

config.xml

```
<preference name="DisallowOverscroll" value="true" />
<preference name="webviewbounce" value="false" />
<preference name="UIWebViewBounce" value="false" />
<preference name="EnableViewportScale" value="false" />
```

