export const calculateMoonPhase = (num) => {
  const decimal = Math.round(num);
  if (decimal === 0) {
    return "New Moon";
  } else if (decimal > 0 && decimal < 25) {
    return "Waxing Crescent";
  } else if (decimal === 50) {
    return "First Quarter";
  } else if (decimal >= 25 && decimal < 50) {
    return "Waxing Gibbous";
  } else if (decimal === 100) {
    return "Full Moon";
  } else if (decimal > 50 && decimal < 75) {
    return "Waning Gibbous";
  } else if (decimal === 75) {
    return "Last Quarter";
  } else if (decimal > 75 && decimal < 100) {
    return "Waning Crescent";
  }
};
// export const img = {
//   01: { img01 },
//   02: img02,
//   03: img03,
//   04: img04,
// };
export const moonPhases = {
  "Last Quarter": {
    action: "Release and Let go",
    desc: "Let go of the habits that bind you and do you harm.",
  },
  "New Moon": {
    action: "New Beginnings",
    desc:
      "It's time for a clean slate, start to gather your thoughts and plan.",
  },
  "Waxing Crescent": {
    action: "Set Intentions",
    desc: "Send your hopes and desires into the world.",
  },
  "First Quarter": {
    action: "Take Action",
    desc:
      "When you face obstacles, do not waver. It's time for pushing forward.",
  },
  "Waxing Gibbous": {
    action: "Refine and Hone",
    desc:
      "Observe and align your hopes with the universe. Momentum is building.",
  },
  "Full Moon": {
    action: "Harvest Endeavors",
    desc: "A time to harvest the intentions and wishes of past moons.",
  },
  "Waning Gibbous": {
    action: "Introspect",
    desc: "Turn inwards, think about your goals, and be grateful.",
  },
  "Waning Crescent": {
    action: "Surrender",
    desc: "Recuperate and rest. It is okay to feel empty sometimes.",
  },
};
