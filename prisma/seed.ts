import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@birkityt.ru";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.warn(
      "⚠️  ADMIN_PASSWORD not set — skipping admin user seed.",
    );
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
      name: "Администратор",
      role: Role.ADMIN,
    },
  });

  console.log(`✅ Admin user ready: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
