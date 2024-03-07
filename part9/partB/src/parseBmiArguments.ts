export const parseBmiArguments = (args: string[]) => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};
