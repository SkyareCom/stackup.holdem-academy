plugins {
    id("com.android.application")
}

val releaseKeystore = System.getenv("STACKUP_UPLOAD_KEYSTORE")
val releaseStorePassword = System.getenv("STACKUP_UPLOAD_STORE_PASSWORD")
val releaseKeyAlias = System.getenv("STACKUP_UPLOAD_KEY_ALIAS")
val releaseKeyPassword = System.getenv("STACKUP_UPLOAD_KEY_PASSWORD")
val hasReleaseSigning = listOf(
    releaseKeystore,
    releaseStorePassword,
    releaseKeyAlias,
    releaseKeyPassword
).all { !it.isNullOrBlank() }

android {
    namespace = "com.skyare.stackupacademy"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.skyare.stackupacademy"
        minSdk = 24
        targetSdk = 36
        versionCode = 101
        versionName = "1.0.5"
    }

    signingConfigs {
        if (hasReleaseSigning) {
            create("release") {
                storeFile = file(releaseKeystore!!)
                storePassword = releaseStorePassword
                keyAlias = releaseKeyAlias
                keyPassword = releaseKeyPassword
            }
        }
    }

    buildTypes {
        debug {
            applicationIdSuffix = ".test"
            versionNameSuffix = "-test"
            signingConfig = signingConfigs.getByName("debug")
        }
        release {
            isMinifyEnabled = false
            if (hasReleaseSigning) {
                signingConfig = signingConfigs.getByName("release")
            }
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    sourceSets.getByName("debug").assets.srcDir(layout.buildDirectory.dir("generated/testAssets"))
}

val prepareTestAssets by tasks.registering(Exec::class) {
    workingDir(rootProject.projectDir.parentFile)
    commandLine("node", "scripts/prepare-test-assets.js")
}
tasks.matching { it.name == "preDebugBuild" }.configureEach {
    dependsOn(prepareTestAssets)
}
