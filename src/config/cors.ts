import cors from "cors";

export const corsConfig = () => {
  const origins = [process.env.WEB_APP_ORIGIN];

  return cors({
    origin: (origin, callback) => {
      if (!origin || origins.includes(origin)) {
        return callback(null, origin);
      }

      return callback(new Error("Unauthorized origin: " + origin));
    },
    credentials: true,
  });
};
