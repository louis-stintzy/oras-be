import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test'], {
    message: 'NODE_ENV must be one of development, production, or test',
  }),
  PORT: z.coerce
    .number({ message: 'Invalid PORT number' })
    .min(1, { message: 'Invalid PORT number' })
    .max(65535, { message: 'Invalid PORT number' }),
  CORS_ORIGIN: z
    .string()
    .min(1, { message: 'CORS_ORIGIN is required' })
    .transform((s) =>
      s
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean)
    )
    .refine((arr) => arr.length > 0, {
      message: 'CORS_ORIGIN must contain at least one origin',
    })
    .refine((arr) => arr.every((origin) => /^https?:\/\//i.test(origin)), {
      message: 'CORS_ORIGIN must be http(s) urls only',
    }),
});

export type Env = z.infer<typeof envSchema>;

export const env: Readonly<Env> = (() => {
  try {
    const parsed = envSchema.parse(process.env);
    console.log('✅ Environment variables loaded successfully');
    return parsed;
  } catch (error) {
    console.error('❌ Invalid environment variables:');
    if (error instanceof z.ZodError) {
      for (const issue of error.issues) {
        console.error(`    ❗ ${issue.message}`);
      }
    } else {
      console.error(error);
    }
    process.exit(1);
  }
})();
