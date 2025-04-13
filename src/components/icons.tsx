import { FaGithub, FaKey } from "react-icons/fa";
const iconSize = 20; // Set the desired icon size
export function Icons({ IconName }: { IconName: string }) {
  switch (IconName) {
    case "GitHub":
      return <FaGithub className="text-white" size={iconSize} />;
    default:
      return <FaKey className="text-white" size={iconSize} />;
  }
}
