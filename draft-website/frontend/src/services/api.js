const API_BASE = 'http://localhost:3000'

class PokemonAPIError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
    this.name = 'PokemonAPIError'
  }
}

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }))
    throw new PokemonAPIError(error.error || 'Request failed', response.status)
  }
  return response.json()
}

export const pokemonAPI = {
  /**
   * Get all moves (alphabetically sorted)
   * Returns: [{ Move: "Thunderbolt" }, { Move: "Ice Beam" }, ...]
   */
  async getAllMoves() {
    try {
      const response = await fetch(`${API_BASE}/moves`)
      const data = await handleResponse(response)
      // Extract just the move names as strings
      return data.map(item => item.Move)
    } catch (error) {
      console.error('Failed to fetch moves:', error)
      throw error
    }
  },

  /**
   * Get all abilities (alphabetically sorted)
   * Returns: [{ AbilityName: "Overgrow" }, { AbilityName: "Blaze" }, ...]
   */
  async getAllAbilities() {
    try {
      const response = await fetch(`${API_BASE}/abilities`)
      const data = await handleResponse(response)
      // Extract just the ability names as strings
      return data.map(item => item.AbilityName)
    } catch (error) {
      console.error('Failed to fetch abilities:', error)
      throw error
    }
  },

  /**
   * Get all types
   * Returns: [{ Type: "Fire" }, { Type: "Water" }, ...]
   */
  async getAllTypes() {
    try {
      const response = await fetch(`${API_BASE}/types`)
      const data = await handleResponse(response)
      // Extract just the type names as strings
      return data.map(item => item.Type)
    } catch (error) {
      console.error('Failed to fetch types:', error)
      throw error
    }
  },

  /**
   * Search Pokemon with filters
   * @param {string} queryString - URL query parameters (e.g., "hp[gte]=100&ability=Overgrow")
   * Returns: [{ Pokemon: "Bulbasaur", Type1: "Grass", Type2: "Poison", HP: 45, ... }, ...]
   */
  async searchPokemon(queryString) {
    try {
      const response = await fetch(`${API_BASE}/pokemon?${queryString}`)
      return await handleResponse(response)
    } catch (error) {
      console.error('Failed to search Pokemon:', error)
      throw error
    }
  }
}