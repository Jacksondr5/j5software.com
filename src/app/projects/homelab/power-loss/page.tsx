import { motion } from "framer-motion";
import { PowerLossPlot } from "./plot";
import { Test } from "./test";

export default function Page() {
  return (
    <div className="text-gray-11">
      <h1 className="text-2xl font-extrabold">Homelab Power Loss</h1>
      <p>
        {/* <ul>
          <li>Why?</li>
        </ul> */}
      </p>
      <div>
        <h2>Process for shutting things down + flow chart</h2>
        <PowerLossPlot />
      </div>
      <div>
        <h2>Learning Go</h2>
      </div>
      <Test />
    </div>
  );
}
