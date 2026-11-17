
import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.gokarabakh.app",
  appName: "Go Karabakh",
  webDir: "dist",
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#202B35",
      showSpinner: false
    },
    StatusBar: {
      backgroundColor: "#202B35",
      style: "LIGHT"
    }
  }
};

export default config;

