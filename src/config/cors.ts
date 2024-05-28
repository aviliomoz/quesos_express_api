import cors from "cors";

const origins = [process.env.WEB_APP_ORIGIN];

export const corsConfig = () => {
  return cors({
    origin: (origin, callback) => {
      if (!origin || origins.includes(origin)) {
        return callback(null, origin);
      }

      return callback(new Error("Unauthorized origin"));
    },
    credentials: true,
  });
};
