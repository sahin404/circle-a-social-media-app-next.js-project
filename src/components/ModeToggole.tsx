import { ThemeSwitch } from "@/components/ui/theme-switch";
import { Sun, Moon} from "lucide-react";

export default function ThemeSwitchTwoNext() {
  return (
    <ThemeSwitch
      modes={["light", "dark"]}
      icons={[
        <Sun key="sun-icon" size={16} />,
        <Moon key="moon-icon" size={16} />,
      ]}
      showInactiveIcons="next"
    />
  );
}
