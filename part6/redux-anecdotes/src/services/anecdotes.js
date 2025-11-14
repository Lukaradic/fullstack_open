const baseUrl = "http://localhost:3000";

export const getAnecdotes = async () => {
  try {
    const res = await fetch(`${baseUrl}/anecdotes`);
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const createAnecdote = async (content) => {
  try {
    const res = await fetch(`${baseUrl}/anecdotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, votes: 0 }),
    });
    if (!res.ok) {
      throw new Error("Failed to create anecdote");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const voteForAnecdote = async (id, voteNumer) => {
  try {
    const res = await fetch(`${baseUrl}/anecdotes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ votes: voteNumer }),
    });
    if (!res.ok) {
      throw new Error("Failed to create anecdote");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
