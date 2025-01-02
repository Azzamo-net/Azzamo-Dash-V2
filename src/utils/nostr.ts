import { nip19 } from 'nostr-tools';

export const parseNostrKey = (input: string): string | null => {
  try {
    // Handle npub
    if (input.startsWith('npub')) {
      const { data } = nip19.decode(input);
      return data as string;
    }
    
    // Handle hex public key
    if (/^[0-9a-fA-F]{64}$/.test(input)) {
      return input.toLowerCase();
    }

    return null;
  } catch (error) {
    return null;
  }
};
