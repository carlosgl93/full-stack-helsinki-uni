export const parseCalculatorArguments = (args: string[]) => {
  if (args.length < 9) throw new Error("Not enough arguments");

  if (args.slice(2).every(arg => !isNaN(Number(arg)))) {
    return {
      dailyHours: args.slice(2, -1).map(arg => Number(arg)),
      target: Number(args[args.length - 1])
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};
