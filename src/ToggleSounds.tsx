import React, { memo } from "react";

type Toggleparams = {
  allowSound: boolean;
  setAllowSound: (allow: boolean) => void;
};

const ToggleSounds = ({ allowSound, setAllowSound }: Toggleparams) => {
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔊 " : "🔈 "}
    </button>
  );
};

export default memo(ToggleSounds);
