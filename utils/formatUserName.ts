const USER_NAME_FALLBACK = "Técnico";

export function formatUserName(email?: string | null) {
  const localPart = email?.trim().split("@")[0] ?? "";
  const normalizedName = localPart.replace(/[._-]+/g, " ").trim();

  if (!normalizedName) {
    return USER_NAME_FALLBACK;
  }

  return normalizedName
    .split(/\s+/)
    .map((word) => {
      const firstLetter = word.charAt(0).toLocaleUpperCase("pt-BR");
      const remainingLetters = word.slice(1).toLocaleLowerCase("pt-BR");

      return `${firstLetter}${remainingLetters}`;
    })
    .join(" ");
}
