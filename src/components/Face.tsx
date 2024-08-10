import "react-awesome-button/dist/styles.css";

interface Props {
  disabled: boolean;
}

export default function Face(props: Props) {
  const face = `【≽ܫ≼】`;
  return (
    <>
      <div
        className={`${
          props.disabled ? "bg-gray-400" : "bg-pink-400"
        } flex flex-col items-center justify-center
          text-5xl text-white rounded-3xl cursor-pointer
          [box-shadow:0_15px_0_0_#edf2f4,0_25px_0_0_#1b70f841]
          duration-150
          active:translate-y-2
          active:[box-shadow:0_0px_0_0_#edf2f4,0_0px_0_0_#1b70f841]`}
      >
        {face}
      </div>
    </>
  );
}
