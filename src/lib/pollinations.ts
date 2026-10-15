/**
 * Pollinations AI (Flux Model) Visual Hint Engine for TeacherOS
 * Zero API-key educational visual clue generator
 */

export function buildPollinationsUrl(
  prompt: string,
  options: { width?: number; height?: number; seed?: number } = {}
): string {
  const width = options.width || 600;
  const height = options.height || 400;
  const seedParam = options.seed ? `&seed=${options.seed}` : "";
  
  // Clean prompt and add educational vector/icon styling
  const cleaned = prompt.replace(/[^a-zA-Z0-9 ,.-]/g, " ").trim();
  const enhancedPrompt = `${cleaned}, clean educational modern vector illustration, minimalist icon design, isolated on clean background, high clarity, pedagogy concept`;
  const encoded = encodeURIComponent(enhancedPrompt);
  
  return `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&model=flux&nologo=true${seedParam}`;
}

export function getSlideImageUrl(
  topic: string,
  slideTitle: string,
  customPrompt?: string,
  seed?: number
): string {
  const prompt = customPrompt || `${topic} - ${slideTitle}, educational graphic`;
  return buildPollinationsUrl(prompt, { width: 800, height: 450, seed });
}

/**
 * Visual Hint generator for vocabulary words.
 * Specifically tuned for conceptual clarity, avoiding generic portraits for grammar words.
 */
export function getVocabImageUrl(
  word: string,
  uz?: string,
  seed?: number,
  customPrompt?: string
): string {
  if (customPrompt) {
    return buildPollinationsUrl(customPrompt, { width: 500, height: 350, seed });
  }

  const w = (word || "").toLowerCase().trim();

  // Smart conceptual mapping for relative pronouns & grammar terms
  if (w === "which") {
    return buildPollinationsUrl(
      "minimalist educational icon choosing between items, red car or blue book with pointing arrow, object selection concept",
      { width: 500, height: 350, seed }
    );
  }
  if (w === "who") {
    return buildPollinationsUrl(
      "minimalist educational icon of a person or teacher helping a student, friendly human silhouette icon",
      { width: 500, height: 350, seed }
    );
  }
  if (w === "where") {
    return buildPollinationsUrl(
      "minimalist educational icon of a map pin on a school building or destination, travel navigation",
      { width: 500, height: 350, seed }
    );
  }
  if (w === "when") {
    return buildPollinationsUrl(
      "minimalist educational icon of a clock with calendar timeline, time concept",
      { width: 500, height: 350, seed }
    );
  }
  if (w === "whose") {
    return buildPollinationsUrl(
      "minimalist educational icon of person holding key to a car or house, ownership and possession",
      { width: 500, height: 350, seed }
    );
  }
  if (w === "that") {
    return buildPollinationsUrl(
      "minimalist educational icon pointing to a specific book and person, universal connector",
      { width: 500, height: 350, seed }
    );
  }

  // General vocabulary visual clue
  const prompt = `clear educational visual clue and icon representing the meaning of "${word}" (${uz || ""}), simple vector art, educational clipart`;
  return buildPollinationsUrl(prompt, { width: 500, height: 350, seed });
}
