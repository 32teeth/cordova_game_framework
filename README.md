#games builder
----

So you want to build a html5/canvas based app in [cordova](http://cordova.apache.org/)


Install cordova (if not installed)
 
```
[sudo] npm install -g cordova
```

navigate to the directory where you want to create your app

```
cd [directory]
```

Create an app

```
cordova create [directory] [reverse domain-style identifier] [application display name]
```

Add some plugins

```
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-console
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-game-center
cordova plugin add cordova-plugin-admobpro
cordova plugin add org.pushandplay.cordova.apprate
```

iOS9 long press fix (optional)

*this prevents the copy/select bubble from coming up in games where the user needs to press and hold)*

```
cordova-plugin-ios-longpress-fix
```

Device motion plugin (optional)

```
cordova plugin add org.apache.cordova.device-motion
```

Add some platforms

```
cordova platform add ios
cordova platform add android
cordova platform add amazon-fireos
cordova platform add blackberry10
cordova platform add firefoxos
```

Prepare your platforms

```
prepare platform add ios
prepare platform add android
prepare platform add amazon-fireos
prepare platform add blackberry10
prepare platform add firefoxos
```

Build your platforms (i use xcode for ios build)

```
cordova build android --release
```

The fun Android stuff

* make sure you have the [Android SDK](https://developer.android.com/sdk/index.html)
* create a keystore file

```
[sudo] keytool -genkey -v -keystore [key name].keystore -alias [alias] -keyalg RSA -keysize 2048 -validity 10000
```

you will be prompted to provision additional details

* password
* full name
* organization unit (optional)
* organization
* city or locality
* state or province
* two letter country code

at the "is this correct line" enter

```
yes
```

once you have built the release version of your Android app, sign and align it with the keystore you created above (DO NOT LOSE THIS FILE)

```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore 
[path]/[file.keystore]
[path to game]/platforms/android/build/outputs/apk/android-release-unsigned.apk [keystore]
```

```
jarsigner -verify -verbose -certs [path to apk]
```

```
zipalign [path to android apk]/Android\ SDK/build-tools/23.0.0/zipalign  -v 4 
[path to game]/platforms/android/build/outputs/apk/android-release-unsigned.apk 
[path to game]/platforms/android/build/outputs/apk/android-release.apk
```


iOS specific config.xml

```
<preference name="DisallowOverscroll" value="true" />
<preference name="webviewbounce" value="false" />
<preference name="UIWebViewBounce" value="false" />
<preference name="EnableViewportScale" value="false" />
```

