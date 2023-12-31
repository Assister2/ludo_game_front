import { toast } from "react-toastify";

export function sortEvents(events, userId) {
  events.sort((a, b) => {
    if (
      a.state === "playing" &&
      (a.player === userId || a.creator._id === userId)
    ) {
      return -1;
    }
    if (
      b.state === "playing" &&
      (b.player === userId || b.creator._id === userId)
    ) {
      return 1;
    }
    if (a.state === "open" && a.creator?._id === userId) {
      return -1;
    }
    if (b.state === "open" && b.creator?._id === userId) {
      return 1;
    }
    if (a.state === "requested" && a.player?._id === userId) {
      return -1;
    }
    if (b.state === "requested" && b.player?._id === userId) {
      return 1;
    }

    // 1) state == "open" && creator._id == userId
    if (a.state === "requested" && a.creator._id === userId) {
      return -1;
    }
    if (b.state === "requested" && b.creator._id === userId) {
      return 1;
    }
    if (
      (a.state === "playing" && a.creator?._id === userId) ||
      a.player?._id === userId
    ) {
      return -1;
    }
    if (
      (b.state === "playing" && b.creator?._id === userId) ||
      b.player?._id === userId
    ) {
      return 1;
    }
    // if (a.state === "playing" && a.player?._id === userId) return -1;
    // if (b.state === "playing" && b.player?._id === userId) return 1;

    if (
      (a.state === "hold" && a.creator?._id === userId) ||
      a.player?._id === userId
    ) {
      return -1;
    }
    if (
      (b.state === "hold" && b.creator?._id === userId) ||
      b.player?._id === userId
    ) {
      return 1;
    }
    // if (a.state === "hold" && a.player?._id === userId) return -1;
    // if (b.state === "hold" && b.player?._id === userId) return 1;

    // 1) state == "open" && creator._id == userId

    // 1) state == "open" && creator._id == userId
    if (
      a.state === "requested" &&
      a.player === userId &&
      a.creator === userId
    ) {
      return -1;
    }
    if (
      b.state === "requested" &&
      b.player === userId &&
      b.creator === userId
    ) {
      return 1;
    }
    if (a.state === "open" && a.creator._id !== userId && a.player !== userId) {
      return -1;
    }
    if (b.state === "open" && b.creator._id !== userId && b.player !== userId) {
      return 1;
    }
    if (
      a.creator?._id != userId &&
      a.player?._id != userId &&
      a.state == "playing"
    ) {
      return -1;
    }
    if (
      b.creator?._id != userId &&
      b.player?._id != userId &&
      b.state == "playing"
    ) {
      return 1;
    }
    // 1) state == "open" && creator._id == userId

    // Default sorting
    return 0;
  });

  return events;
}

export function filterEvents(events, userId, viewGame) {
  let tempData = events.filter(
    (item) =>
      !(
        (item.state === "requested" &&
          item.player?._id !== userId &&
          item.creator?._id !== userId) ||
        (item.state === "hold" &&
          item.player?._id !== userId &&
          item.creator?._id !== userId)
      )
  );

  events.forEach((element) => {
    if (
      element.state === "playing" &&
      element.player?._id === userId &&
      element.firstTime
    ) {
      viewGame(element._id);
    }
    if (element.state === "requested" && element.creator._id === userId) {
      // playAudio2();
    }
  });

  return tempData;
}
export function challengesSort(challegesData, userId, sorting) {
  challegesData.sort((a, b) => {
    if (
      a.state === "playing" &&
      (a.player === userId || a.creator._id === userId)
    )
      return -1;
    if (
      b.state === "playing" &&
      (b.player === userId || b.creator._id === userId)
    )
      return 1;

    // 1) state == "open" && creator._id == userId
    if (a.state === "requested" && a.creator._id === userId) return -1;
    if (b.state === "requested" && b.creator._id === userId) return 1;
    // 1) state == "open" && creator._id == userId
    if (a.state === "requested" && a.player?._id === userId) return -1;
    if (b.state === "requested" && b.player?._id === userId) return 1;

    // 1) state == "open" && creator._id == userId
    if (a.state === "open" && a.creator._id === userId) return -1;
    if (b.state === "open" && b.creator._id === userId) return 1;

    // 1) state == "open" && creator._id == userId
    if (a.state === "requested" && a.player === userId && a.creator === userId)
      return -1;
    if (b.state === "requested" && b.player === userId && b.creator === userId)
      return 1;

    if (sorting == "lowToHigh") {
      if (a.state === "open" && a.creator._id !== userId) {
        if (b.state === "open" && b.creator._id !== userId) {
          return a.amount - b.amount;
        }
        return -1;
      }
      if (b.state === "open" && b.creator._id !== userId) return 1;
    } else if (sorting == "highToLow") {
      if (a.state === "open" && a.creator._id !== userId) {
        if (b.state === "open" && b.creator._id !== userId) {
          return b.amount - a.amount;
        }
        return -1;
      }
      if (b.state === "open" && b.creator._id !== userId) return 1;
    }

    if (a.state === "open" && a.creator._id !== userId && a.player !== userId)
      return -1;
    if (b.state === "open" && b.creator._id !== userId && b.player !== userId)
      return 1;

    if (
      a.creator?._id != userId &&
      a.player?._id != userId &&
      a.state == "playing"
    )
      return -1;
    if (
      b.creator?._id != userId &&
      b.player?._id != userId &&
      b.state == "playing"
    )
      return 1;

    // Default sorting
    return 0;
  });
}
export function validateAmount(amount) {
  if (amount < 20 || amount > 10000) {
    toast.error("Amount should be between 20 and 10000.");
    return false;
  }

  if (amount < 50 && amount % 10 !== 0) {
    toast.error("Amount should be a multiple of 10.");
    return false;
  }

  if (amount >= 50 && amount % 50 !== 0) {
    toast.error("Amount should be a multiple of 50.");
    return false;
  }

  return true;
}

export function isAvailabletoPlayGame(wallet, amount) {
  if (wallet < amount) {
    toast.error("Not nough chips.");
    return false;
  }
  return true;
}
