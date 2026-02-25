export const config = {
  baseUrl: process.env.BASE_URL!,

  users: {
    standard: process.env.STANDARD_USER!,
    locked: process.env.LOCKED_OUT_USER!,
    problem: process.env.PROBLEM_USER!,
    performance: process.env.PERFORMANCE_USER!,
  },

  password: process.env.PASSWORD!,
};