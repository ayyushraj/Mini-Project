
export const importJSON = async (fileName) => {
    try {
      const module = await import(`../questionsList/${fileName}`);
      return module.default;
    } catch (error) {
      console.error(`Error importing JSON file ${fileName}:`, error);
      return null;
    }
  };
  