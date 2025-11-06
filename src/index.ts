import { createApp } from './app';

const app = createApp();
const PORT = 3100;

app.listen(PORT, () => {
  console.log(`➡️  Server running on port ${PORT}`);
});
