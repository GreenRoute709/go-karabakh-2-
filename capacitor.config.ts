
import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.gokar abakh.app".replaceAll(" ", ""),
  appName: "Go Karabakh",
  webDir: "dist",
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#202B35",
      showSpinner: false
    },
    StatusBar: {
      backgroundColor: "#202B35",
      style: "DARK"
    }
  }
};

export default config;
