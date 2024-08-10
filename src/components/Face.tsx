import "react-awesome-button/dist/styles.css";
import { useState } from "react";

interface Props {
  disabled: boolean;
}

export default function Face(props: Props) {
  // pretter-ignore
  const faces = ["【≽ܫ≼】", "ಠ╭╮ಠ", "(ᵔᴥᵔ)", "◔̯◔"];
  const [face, setFace] = useState<string>(faces[0]);

  return (
    <>
      <div
        className={`${
          props.disabled ? "bg-gray-400" : "bg-pink-400"
        } flex flex-col items-center justify-center min-h-[180px]
          text-5xl text-white rounded-3xl cursor-pointer
          [box-shadow:0_15px_0_0_#edf2f4,0_25px_0_0_#1b70f841]
          duration-150
          active:translate-y-2
          active:[box-shadow:0_0px_0_0_#edf2f4,0_0px_0_0_#1b70f841]`}
        onClick={() => setFace(faces[Math.floor(Math.random() * faces.length)])}
      >
        {props.disabled ? "" : face}
      </div>
    </>
  );
}
