
/**
 * Domain Service
 * This service handles domain availability checking and DNS record lookups
 */

// Interface for domain check response
export interface DomainCheckResponse {
  available: boolean;
  domain: string;
  price?: number;
  records?: {
    dns?: boolean;
    nameserver?: boolean;
    a?: boolean;
    txt?: boolean;
  };
}

/**
 * Check domain availability by checking DNS records
 * @param domainName The domain name (without extension)
 * @param extension The domain extension (with dot, e.g. ".co.ao")
 * @returns Promise with domain availability information
 */
export const checkDomainAvailability = async (
  domainName: string,
  extension: string
): Promise<DomainCheckResponse> => {
  try {
    // In a real implementation, we would query DNS records here
    // For this demo, we'll simulate DNS lookups with randomized responses
    // but with consistent results for the same domain name
    
    // Create a deterministic "hash" based on the domain name length and characters
    const hash = domainName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Use the hash to determine if the domain is taken (more predictable than random)
    // Domains with certain characteristics will consistently show as available or taken
    const hasDnsRecords = hash % 7 === 0; // About 1/7 domains will have DNS records
    const hasNameservers = hash % 5 === 0; // About 1/5 domains will have nameservers
    const hasARecord = hash % 4 === 0; // About 1/4 domains will have A records
    const hasTxtRecord = hash % 6 === 0; // About 1/6 domains will have TXT records
    
    // A domain is available if it has no DNS records of any kind
    const isAvailable = !(hasDnsRecords || hasNameservers || hasARecord || hasTxtRecord);
    
    // Calculate price based on domain extension and length
    let price;
    if (extension === '.ao') {
      price = 25000;
    } else if (['.co.ao', '.it.ao', '.edu.ao'].includes(extension)) {
      price = 35000;
    } else {
      price = 15000; // Default price for other extensions
    }
    
    // Premium pricing for short domains (3 characters or less)
    if (domainName.length <= 3) {
      price = 300000;
    }
    
    // Add a small delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      available: isAvailable,
      domain: `${domainName}${extension}`,
      price: isAvailable ? price : undefined,
      records: {
        dns: hasDnsRecords,
        nameserver: hasNameservers,
        a: hasARecord,
        txt: hasTxtRecord
      }
    };
  } catch (error) {
    console.error("Error checking domain availability:", error);
    throw new Error("Failed to check domain availability");
  }
};

/**
 * Register a domain
 * This is a placeholder for the actual domain registration API
 */
export const registerDomain = async (domainName: string, extension: string, contactProfileId: string) => {
  // In a real implementation, this would call the domain registrar API
  // For now, we just return a successful response after a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    domain: `${domainName}${extension}`,
    registrationDate: new Date().toISOString(),
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
  };
};
