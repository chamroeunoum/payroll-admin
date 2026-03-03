<<<<<<< HEAD
class KhmerCluster {
    // === KHMER CHARACTER CATEGORIES ===
    
    // Base characters (consonants and independent vowels)
    static baseCharacters = [
        // Consonants
        'ក', 'ខ', 'គ', 'ឃ', 'ង',
        'ច', 'ឆ', 'ជ', 'ឈ', 'ញ',
        'ដ', 'ឋ', 'ឌ', 'ឍ', 'ណ',
        'ត', 'ថ', 'ទ', 'ធ', 'ន',
        'ប', 'ផ', 'ព', 'ភ', 'ម',
        'យ', 'រ', 'ល', 'វ',
        'ឝ', 'ឞ', 'ស', 'ហ', 'ឡ', 'អ',
        // Independent vowels
        'ឥ', 'ឦ', 'ឧ', 'ឨ', 'ឩ', 'ឪ', 'ឫ', 'ឬ', 'ឭ', 'ឮ',
        'ឯ', 'ឰ', 'ឱ', 'ឲ', 'ឳ',
        // Numbers (also considered base characters)
        '០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩',
        // Other signs that can be base characters
        '៚', '៛', 'ៜ', '៝'
    ];

    // Subscript consonants (using coeng character U+17D2)
    static subscriptConsonants = [
        '\u17D2\u1780', // ក subscript
        '\u17D2\u1781', // ខ subscript
        '\u17D2\u1782', // គ subscript
        '\u17D2\u1783', // ឃ subscript
        '\u17D2\u1784', // ង subscript
        '\u17D2\u1785', // ច subscript
        '\u17D2\u1786', // ឆ subscript
        '\u17D2\u1787', // ជ subscript
        '\u17D2\u1788', // ឈ subscript
        '\u17D2\u1789', // ញ subscript
        '\u17D2\u178A', // ដ subscript (TA)
        '\u17D2\u178B', // ឋ subscript
        '\u17D2\u178C', // ឌ subscript
        '\u17D2\u178D', // ឍ subscript
        '\u17D2\u178E', // ណ subscript
        '\u17D2\u178F', // ត subscript
        '\u17D2\u1790', // ថ subscript
        '\u17D2\u1791', // ទ subscript
        '\u17D2\u1792', // ធ subscript
        '\u17D2\u1793', // ន subscript
        '\u17D2\u1794', // ប subscript
        '\u17D2\u1795', // ផ subscript
        '\u17D2\u1796', // ព subscript
        '\u17D2\u1797', // ភ subscript
        '\u17D2\u1798', // ម subscript
        '\u17D2\u1799', // យ subscript
        '\u17D2\u179A', // រ subscript
        '\u17D2\u179B', // ល subscript
        '\u17D2\u179C', // វ subscript
        '\u17D2\u179D', // ឝ subscript
        '\u17D2\u179E', // ឞ subscript
        '\u17D2\u179F', // ស subscript
        '\u17D2\u17A0', // ហ subscript
        '\u17D2\u17A1', // ឡ subscript
        '\u17D2\u17A2'  // អ subscript
    ];

    // Dependent vowels (from paper)
    static dependentVowels = [
        '\u17B6', // ា
        '\u17B7', // ិ
        '\u17B8', // ី
        '\u17B9', // ឹ
        '\u17BA', // ឺ
        '\u17BB', // ុ
        '\u17BC', // ូ
        '\u17BD', // ួ
        '\u17BE', // ើ
        '\u17BF', // ឿ
        '\u17C0', // ៀ
        '\u17C1', // េ
        '\u17C2', // ែ
        '\u17C3', // ៃ
        '\u17C4', // ោ
        '\u17C5', // ៅ
        '\u17C6', // ំ (nikahit)
        '\u17C7', // ះ (reahmuk)
        '\u17C8', // ៈ (yŭkôleăkpĭntŭ)
        '\u17C9', // ៉ (muusikatoan - consonant shifter)
        '\u17CA', // ៊ (triisap - consonant shifter)
        '\u17CB', // ់ (bantoc)
        '\u17CC', // ៌ (robat)
        '\u17CD', // ៍ (toandakhiat)
        '\u17CE', // ៎ (kakabat)
        '\u17CF', // ៏ (ahsda)
        '\u17D0', // ័ (samYok)
        '\u17D1', // ៑ (viriam)
        '\u17D2', // ្ (coeng - subscript marker)
        '\u17D3', // ៓ (bathamasat)
        '\u17DD'  // ៝ (atthacan)
    ];

    // Other signs (from paper: '៎', '៏', '័', '៑')
    static otherSigns = [
        '\u17CE', // ៎
        '\u17CF', // ៏
        '\u17D0', // ័
        '\u17D1'  // ៑
    ];

    // Character categories for detection
    static characterCategories = {
        BASE: 'BASE',
        SUBSCRIPT: 'SUBSCRIPT',
        VOWEL: 'VOWEL',
        CONSONANT_SHIFTER: 'CONSONANT_SHIFTER',
        ROBAT: 'ROBAT',
        OTHER_SIGN: 'OTHER_SIGN',
        ZERO_WIDTH: 'ZERO_WIDTH',
        NON_KHMER: 'NON_KHMER'
    };

    // Unicode ranges for Khmer
    static khmerUnicodeRange = {
        start: 0x1780,
        end: 0x17FF
    };

    // Special characters
    static zeroWidthSpace = '\u200B';
    static zeroWidthNonJoiner = '\u200C';
    static zeroWidthJoiner = '\u200D';
    static space = ' ';
    static comma = ',';
    static period = '.';
    static coeng = '\u17D2'; // Coeng character (subscript marker)

    // === CLUSTER SEGMENTATION METHODS ===

    /**
     * Check if a character is within Khmer Unicode range
     * @param {string} char - Character to check
     * @returns {boolean}
     */
    static isKhmerCharacter(char) {
        if (char.length === 0) return false;
        const code = char.codePointAt(0);
        return code >= this.khmerUnicodeRange.start && 
               code <= this.khmerUnicodeRange.end;
    }

    /**
     * Get the category of a Khmer character
     * @param {string} char - Character to categorize
     * @returns {string} Character category
     */
    static getCharacterCategory(char) {
        if (char.length === 0) return this.characterCategories.NON_KHMER;
        
        // Check if it's a Khmer character
        if (!this.isKhmerCharacter(char)) {
            // Check for special characters
            if (char === this.zeroWidthSpace || 
                char === this.zeroWidthNonJoiner || 
                char === this.zeroWidthJoiner) {
                return this.characterCategories.ZERO_WIDTH;
            }
            return this.characterCategories.NON_KHMER;
        }

        // Check for base characters
        if (this.baseCharacters.includes(char)) {
            return this.characterCategories.BASE;
        }

        // Check for subscript (coeng + consonant)
        if (char.startsWith(this.coeng)) {
            return this.characterCategories.SUBSCRIPT;
        }

        // Check for dependent vowels
        if (this.dependentVowels.includes(char)) {
            // Special check for consonant shifters
            if (char === '\u17C9' || char === '\u17CA') {
                return this.characterCategories.CONSONANT_SHIFTER;
            }
            // Special check for robat
            if (char === '\u17CC') {
                return this.characterCategories.ROBAT;
            }
            return this.characterCategories.VOWEL;
        }

        // Check for other signs
        if (this.otherSigns.includes(char)) {
            return this.characterCategories.OTHER_SIGN;
        }

        // Default to base for other Khmer characters
        return this.characterCategories.BASE;
    }

    /**
     * Segment a Khmer sentence into clusters
     * Based on the paper's definition: B {R|C} {S{R}}* {{Z}V} {O} {S}
     * Where:
     *   B = Base character
     *   R = ROBAT
     *   C = Consonant shifter
     *   S = Subscript
     *   Z = Zero width space/non-joiner
     *   V = Vowel
     *   O = Other sign
     * @param {string} sentence - Khmer sentence to segment
     * @returns {Array} Array of clusters
     */
    static segmentIntoClusters(sentence) {
        if (typeof sentence !== 'string' || sentence.length === 0) {
            return [];
        }

        const clusters = [];
        let currentCluster = [];
        let inNumberSequence = false;

        // Helper function to finalize current cluster
        const finalizeCluster = () => {
            if (currentCluster.length > 0) {
                clusters.push(currentCluster.join(''));
                currentCluster = [];
            }
        };

        // Helper function to handle non-Khmer characters
        const handleNonKhmer = (char) => {
            // Special handling for number sequences with commas/periods
            if (char === this.comma || char === this.period) {
                if (inNumberSequence) {
                    currentCluster.push(char);
                    return;
                }
            }
            
            // Finalize current Khmer cluster
            finalizeCluster();
            
            // Handle space characters (treat as separate cluster per paper)
            if (char === this.space || char === this.zeroWidthSpace) {
                clusters.push(char);
            } 
            // Handle other non-Khmer as separate clusters
            else if (!char.match(/\s/)) {
                clusters.push(char);
            }
            
            // Reset number sequence flag
            inNumberSequence = false;
        };

        for (let i = 0; i < sentence.length; i++) {
            const char = sentence[i];
            const category = this.getCharacterCategory(char);

            // Check if character starts a number sequence
            const isKhmerNumeral = /^[\u17E0-\u17E9]$/.test(char);
            if (isKhmerNumeral) {
                inNumberSequence = true;
            }

            switch (category) {
                case this.characterCategories.NON_KHMER:
                    handleNonKhmer(char);
                    break;

                case this.characterCategories.BASE:
                    // If we have a current cluster and encounter a new base,
                    // finalize the current cluster
                    if (currentCluster.length > 0) {
                        finalizeCluster();
                    }
                    currentCluster.push(char);
                    break;

                case this.characterCategories.ZERO_WIDTH:
                    // Zero width characters are part of the current cluster
                    if (currentCluster.length > 0) {
                        currentCluster.push(char);
                    } else {
                        // If no current cluster, treat as separate
                        clusters.push(char);
                    }
                    break;

                case this.characterCategories.SUBSCRIPT:
                case this.characterCategories.VOWEL:
                case this.characterCategories.CONSONANT_SHIFTER:
                case this.characterCategories.ROBAT:
                case this.characterCategories.OTHER_SIGN:
                    // These characters attach to the current base
                    if (currentCluster.length > 0) {
                        currentCluster.push(char);
                    } else {
                        // If no base, treat as standalone
                        clusters.push(char);
                    }
                    break;

                default:
                    // For any other category, treat as non-Khmer
                    handleNonKhmer(char);
                    break;
            }
        }

        // Finalize the last cluster
        finalizeCluster();

        return clusters;
    }

    /**
     * Correct Khmer Unicode character order in a cluster
     * Based on Table VIII from the paper
     * @param {string} cluster - Cluster to correct
     * @returns {string} Corrected cluster
     */
    static correctClusterOrder(cluster) {
        if (cluster.length <= 1) return cluster;

        const chars = Array.from(cluster);
        
        // Find the base character (first character)
        const baseIndex = 0; // Base is always first in our segmentation
        const baseChar = chars[baseIndex];

        // Get characters after the base
        const afterBase = chars.slice(1);
        
        // Categorize characters after base
        const categorized = afterBase.map(char => ({
            char,
            category: this.getCharacterCategory(char),
            position: this.getCharacterPosition(char, baseChar)
        }));

        // Reorder based on priority rules from the paper:
        // Priority order: Consonant Shifter > West Subscript > Other Subscripts > Vowels > Other Signs
        categorized.sort((a, b) => {
            const priorityA = this.getCharacterPriority(a);
            const priorityB = this.getCharacterPriority(b);
            return priorityA - priorityB;
        });

        // Reconstruct cluster
        return baseChar + categorized.map(item => item.char).join('');
    }

    /**
     * Get character position relative to base
     * @param {string} char - Character to check
     * @param {string} baseChar - Base character
     * @returns {string} Position category
     */
    static getCharacterPosition(char, baseChar) {
        // Simplified position detection
        // In practice, this would use more complex positioning logic
        const category = this.getCharacterCategory(char);
        
        if (category === this.characterCategories.SUBSCRIPT) {
            // Determine subscript position based on character properties
            // West subscript (left side), East subscript (right side), South subscript (below)
            // This is a simplified version - actual implementation would be more complex
            return 'SUBSCRIPT';
        }
        
        if (category === this.characterCategories.VOWEL) {
            // Determine vowel position
            // North vowel (above), South vowel (below), East vowel (right), West vowel (left)
            return 'VOWEL';
        }
        
        return category;
    }

    /**
     * Get priority for character ordering
     * @param {Object} charInfo - Character information
     * @returns {number} Priority value (lower = higher priority)
     */
    static getCharacterPriority(charInfo) {
        // Priority order from paper:
        // 1. Consonant Shifter (C)
        // 2. West Subscript (WSS)
        // 3. Other Subscripts (SSS, ESS)
        // 4. Vowels (WV, EV, NV, SV)
        // 5. Other Signs (O)
        
        const { category, position } = charInfo;
        
        switch (category) {
            case this.characterCategories.CONSONANT_SHIFTER:
                return 1;
            case this.characterCategories.SUBSCRIPT:
                // West subscript has higher priority
                if (position === 'WEST') return 2;
                return 3; // Other subscripts
            case this.characterCategories.VOWEL:
                return 4;
            case this.characterCategories.OTHER_SIGN:
                return 5;
            case this.characterCategories.ROBAT:
                return 6;
            default:
                return 7;
        }
    }

    /**
     * Map similar-looking characters to canonical forms
     * Specifically handles TA (ត) and DA (ដ) subscripts as mentioned in paper
     * @param {string} cluster - Cluster to normalize
     * @returns {string} Normalized cluster
     */
    static normalizeSimilarCharacters(cluster) {
        // Map TA subscript (ត) and DA subscript (ដ) to same character
        // Both look similar (ត្រ vs ដ្រ)
        let normalized = cluster;
        
        // Map ត្រ (TA subscript) and ដ្រ (DA subscript) to same representation
        normalized = normalized.replace(/\u17D2\u178A/g, '\u17D2\u178A'); // Keep DA as reference
        normalized = normalized.replace(/\u17D2\u178F/g, '\u17D2\u178A'); // Map TA to DA
        
        return normalized;
    }

    /**
     * Process a full sentence: segment into clusters and correct order
     * @param {string} sentence - Khmer sentence to process
     * @returns {Array} Processed clusters
     */
    static processSentence(sentence) {
        // Step 1: Segment into clusters
        const clusters = this.segmentIntoClusters(sentence);
        
        // Step 2: Correct character order in each cluster
        const correctedClusters = clusters.map(cluster => {
            if (this.isKhmerCharacter(cluster.charAt(0))) {
                const corrected = this.correctClusterOrder(cluster);
                const normalized = this.normalizeSimilarCharacters(corrected);
                return normalized;
            }
            return cluster;
        });
        
        return correctedClusters;
    }

    /**
     * Generate Khmer words from clusters using Bi-directional Maximal Matching
     * This is a simplified version - full implementation would require a corpus
     * @param {Array} clusters - Array of clusters
     * @param {Array} corpus - Word corpus for dictionary lookup
     * @returns {Array} Segmented words
     */
    static segmentIntoWords(clusters, corpus = []) {
        if (clusters.length === 0) return [];
        
        // Simple implementation - in reality would use BiMM algorithm
        const words = [];
        let currentWord = [];
        
        for (const cluster of clusters) {
            // If cluster is space or punctuation, finalize current word
            if (cluster.match(/[\s\u200B,.]/) || !this.isKhmerCharacter(cluster.charAt(0))) {
                if (currentWord.length > 0) {
                    words.push(currentWord.join(''));
                    currentWord = [];
                }
                words.push(cluster);
            } else {
                currentWord.push(cluster);
            }
        }
        
        // Add last word if exists
        if (currentWord.length > 0) {
            words.push(currentWord.join(''));
        }
        
        return words;
    }

    /**
     * Display cluster analysis for debugging
     * @param {string} sentence - Sentence to analyze
     */
    static analyzeClusters(sentence) {
        console.log('=== Khmer Cluster Analysis ===');
        console.log(`Input: "${sentence}"`);
        console.log(`Length: ${sentence.length} characters`);
        
        const clusters = this.segmentIntoClusters(sentence);
        const processedClusters = this.processSentence(sentence);
        
        console.log('\nClusters Found:');
        clusters.forEach((cluster, i) => {
            const charCodes = Array.from(cluster).map(c => 
                `U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`
            ).join(' ');
            
            console.log(`  ${i + 1}. "${cluster}" (${cluster.length} chars) [${charCodes}]`);
        });
        
        console.log('\nProcessed Clusters (Order Corrected):');
        processedClusters.forEach((cluster, i) => {
            if (cluster !== clusters[i]) {
                console.log(`  ${i + 1}. "${clusters[i]}" -> "${cluster}"`);
            } else {
                console.log(`  ${i + 1}. "${cluster}" (unchanged)`);
            }
        });
        
        console.log('\nCluster Types:');
        clusters.forEach((cluster, i) => {
            const firstChar = cluster.charAt(0);
            const category = this.getCharacterCategory(firstChar);
            console.log(`  ${i + 1}. "${cluster}" - ${category}`);
        });
        
        return {
            originalClusters: clusters,
            processedClusters: processedClusters,
            clusterCount: clusters.length
        };
    }

    /**
     * Extract Khmer clusters from mixed text
     * @param {string} text - Text containing Khmer and other characters
     * @returns {Array} Only Khmer clusters
     */
    static extractKhmerClusters(text) {
        const allClusters = this.segmentIntoClusters(text);
        return allClusters.filter(cluster => 
            cluster.length > 0 && this.isKhmerCharacter(cluster.charAt(0))
        );
    }

    /**
     * Join clusters back into text with optional delimiter
     * @param {Array} clusters - Array of clusters
     * @param {string} delimiter - Delimiter to insert between clusters
     * @returns {string} Joined text
     */
    static joinClusters(clusters, delimiter = '') {
        return clusters.join(delimiter);
    }

    /**
     * Count statistics for Khmer text
     * @param {string} text - Text to analyze
     * @returns {Object} Statistics
     */
    static getTextStatistics(text) {
        const clusters = this.segmentIntoClusters(text);
        const khmerClusters = this.extractKhmerClusters(text);
        
        return {
            totalCharacters: text.length,
            totalClusters: clusters.length,
            khmerClusters: khmerClusters.length,
            nonKhmerClusters: clusters.length - khmerClusters.length,
            averageClusterLength: clusters.length > 0 ? 
                text.length / clusters.length : 0
        };
    }
}

// Export for module systems
export default Khmer;

// For CommonJS (Node.js):
=======
class KhmerCluster {
    // === KHMER CHARACTER CATEGORIES ===
    
    // Base characters (consonants and independent vowels)
    static baseCharacters = [
        // Consonants
        'ក', 'ខ', 'គ', 'ឃ', 'ង',
        'ច', 'ឆ', 'ជ', 'ឈ', 'ញ',
        'ដ', 'ឋ', 'ឌ', 'ឍ', 'ណ',
        'ត', 'ថ', 'ទ', 'ធ', 'ន',
        'ប', 'ផ', 'ព', 'ភ', 'ម',
        'យ', 'រ', 'ល', 'វ',
        'ឝ', 'ឞ', 'ស', 'ហ', 'ឡ', 'អ',
        // Independent vowels
        'ឥ', 'ឦ', 'ឧ', 'ឨ', 'ឩ', 'ឪ', 'ឫ', 'ឬ', 'ឭ', 'ឮ',
        'ឯ', 'ឰ', 'ឱ', 'ឲ', 'ឳ',
        // Numbers (also considered base characters)
        '០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩',
        // Other signs that can be base characters
        '៚', '៛', 'ៜ', '៝'
    ];

    // Subscript consonants (using coeng character U+17D2)
    static subscriptConsonants = [
        '\u17D2\u1780', // ក subscript
        '\u17D2\u1781', // ខ subscript
        '\u17D2\u1782', // គ subscript
        '\u17D2\u1783', // ឃ subscript
        '\u17D2\u1784', // ង subscript
        '\u17D2\u1785', // ច subscript
        '\u17D2\u1786', // ឆ subscript
        '\u17D2\u1787', // ជ subscript
        '\u17D2\u1788', // ឈ subscript
        '\u17D2\u1789', // ញ subscript
        '\u17D2\u178A', // ដ subscript (TA)
        '\u17D2\u178B', // ឋ subscript
        '\u17D2\u178C', // ឌ subscript
        '\u17D2\u178D', // ឍ subscript
        '\u17D2\u178E', // ណ subscript
        '\u17D2\u178F', // ត subscript
        '\u17D2\u1790', // ថ subscript
        '\u17D2\u1791', // ទ subscript
        '\u17D2\u1792', // ធ subscript
        '\u17D2\u1793', // ន subscript
        '\u17D2\u1794', // ប subscript
        '\u17D2\u1795', // ផ subscript
        '\u17D2\u1796', // ព subscript
        '\u17D2\u1797', // ភ subscript
        '\u17D2\u1798', // ម subscript
        '\u17D2\u1799', // យ subscript
        '\u17D2\u179A', // រ subscript
        '\u17D2\u179B', // ល subscript
        '\u17D2\u179C', // វ subscript
        '\u17D2\u179D', // ឝ subscript
        '\u17D2\u179E', // ឞ subscript
        '\u17D2\u179F', // ស subscript
        '\u17D2\u17A0', // ហ subscript
        '\u17D2\u17A1', // ឡ subscript
        '\u17D2\u17A2'  // អ subscript
    ];

    // Dependent vowels (from paper)
    static dependentVowels = [
        '\u17B6', // ា
        '\u17B7', // ិ
        '\u17B8', // ី
        '\u17B9', // ឹ
        '\u17BA', // ឺ
        '\u17BB', // ុ
        '\u17BC', // ូ
        '\u17BD', // ួ
        '\u17BE', // ើ
        '\u17BF', // ឿ
        '\u17C0', // ៀ
        '\u17C1', // េ
        '\u17C2', // ែ
        '\u17C3', // ៃ
        '\u17C4', // ោ
        '\u17C5', // ៅ
        '\u17C6', // ំ (nikahit)
        '\u17C7', // ះ (reahmuk)
        '\u17C8', // ៈ (yŭkôleăkpĭntŭ)
        '\u17C9', // ៉ (muusikatoan - consonant shifter)
        '\u17CA', // ៊ (triisap - consonant shifter)
        '\u17CB', // ់ (bantoc)
        '\u17CC', // ៌ (robat)
        '\u17CD', // ៍ (toandakhiat)
        '\u17CE', // ៎ (kakabat)
        '\u17CF', // ៏ (ahsda)
        '\u17D0', // ័ (samYok)
        '\u17D1', // ៑ (viriam)
        '\u17D2', // ្ (coeng - subscript marker)
        '\u17D3', // ៓ (bathamasat)
        '\u17DD'  // ៝ (atthacan)
    ];

    // Other signs (from paper: '៎', '៏', '័', '៑')
    static otherSigns = [
        '\u17CE', // ៎
        '\u17CF', // ៏
        '\u17D0', // ័
        '\u17D1'  // ៑
    ];

    // Character categories for detection
    static characterCategories = {
        BASE: 'BASE',
        SUBSCRIPT: 'SUBSCRIPT',
        VOWEL: 'VOWEL',
        CONSONANT_SHIFTER: 'CONSONANT_SHIFTER',
        ROBAT: 'ROBAT',
        OTHER_SIGN: 'OTHER_SIGN',
        ZERO_WIDTH: 'ZERO_WIDTH',
        NON_KHMER: 'NON_KHMER'
    };

    // Unicode ranges for Khmer
    static khmerUnicodeRange = {
        start: 0x1780,
        end: 0x17FF
    };

    // Special characters
    static zeroWidthSpace = '\u200B';
    static zeroWidthNonJoiner = '\u200C';
    static zeroWidthJoiner = '\u200D';
    static space = ' ';
    static comma = ',';
    static period = '.';
    static coeng = '\u17D2'; // Coeng character (subscript marker)

    // === CLUSTER SEGMENTATION METHODS ===

    /**
     * Check if a character is within Khmer Unicode range
     * @param {string} char - Character to check
     * @returns {boolean}
     */
    static isKhmerCharacter(char) {
        if (char.length === 0) return false;
        const code = char.codePointAt(0);
        return code >= this.khmerUnicodeRange.start && 
               code <= this.khmerUnicodeRange.end;
    }

    /**
     * Get the category of a Khmer character
     * @param {string} char - Character to categorize
     * @returns {string} Character category
     */
    static getCharacterCategory(char) {
        if (char.length === 0) return this.characterCategories.NON_KHMER;
        
        // Check if it's a Khmer character
        if (!this.isKhmerCharacter(char)) {
            // Check for special characters
            if (char === this.zeroWidthSpace || 
                char === this.zeroWidthNonJoiner || 
                char === this.zeroWidthJoiner) {
                return this.characterCategories.ZERO_WIDTH;
            }
            return this.characterCategories.NON_KHMER;
        }

        // Check for base characters
        if (this.baseCharacters.includes(char)) {
            return this.characterCategories.BASE;
        }

        // Check for subscript (coeng + consonant)
        if (char.startsWith(this.coeng)) {
            return this.characterCategories.SUBSCRIPT;
        }

        // Check for dependent vowels
        if (this.dependentVowels.includes(char)) {
            // Special check for consonant shifters
            if (char === '\u17C9' || char === '\u17CA') {
                return this.characterCategories.CONSONANT_SHIFTER;
            }
            // Special check for robat
            if (char === '\u17CC') {
                return this.characterCategories.ROBAT;
            }
            return this.characterCategories.VOWEL;
        }

        // Check for other signs
        if (this.otherSigns.includes(char)) {
            return this.characterCategories.OTHER_SIGN;
        }

        // Default to base for other Khmer characters
        return this.characterCategories.BASE;
    }

    /**
     * Segment a Khmer sentence into clusters
     * Based on the paper's definition: B {R|C} {S{R}}* {{Z}V} {O} {S}
     * Where:
     *   B = Base character
     *   R = ROBAT
     *   C = Consonant shifter
     *   S = Subscript
     *   Z = Zero width space/non-joiner
     *   V = Vowel
     *   O = Other sign
     * @param {string} sentence - Khmer sentence to segment
     * @returns {Array} Array of clusters
     */
    static segmentIntoClusters(sentence) {
        if (typeof sentence !== 'string' || sentence.length === 0) {
            return [];
        }

        const clusters = [];
        let currentCluster = [];
        let inNumberSequence = false;

        // Helper function to finalize current cluster
        const finalizeCluster = () => {
            if (currentCluster.length > 0) {
                clusters.push(currentCluster.join(''));
                currentCluster = [];
            }
        };

        // Helper function to handle non-Khmer characters
        const handleNonKhmer = (char) => {
            // Special handling for number sequences with commas/periods
            if (char === this.comma || char === this.period) {
                if (inNumberSequence) {
                    currentCluster.push(char);
                    return;
                }
            }
            
            // Finalize current Khmer cluster
            finalizeCluster();
            
            // Handle space characters (treat as separate cluster per paper)
            if (char === this.space || char === this.zeroWidthSpace) {
                clusters.push(char);
            } 
            // Handle other non-Khmer as separate clusters
            else if (!char.match(/\s/)) {
                clusters.push(char);
            }
            
            // Reset number sequence flag
            inNumberSequence = false;
        };

        for (let i = 0; i < sentence.length; i++) {
            const char = sentence[i];
            const category = this.getCharacterCategory(char);

            // Check if character starts a number sequence
            const isKhmerNumeral = /^[\u17E0-\u17E9]$/.test(char);
            if (isKhmerNumeral) {
                inNumberSequence = true;
            }

            switch (category) {
                case this.characterCategories.NON_KHMER:
                    handleNonKhmer(char);
                    break;

                case this.characterCategories.BASE:
                    // If we have a current cluster and encounter a new base,
                    // finalize the current cluster
                    if (currentCluster.length > 0) {
                        finalizeCluster();
                    }
                    currentCluster.push(char);
                    break;

                case this.characterCategories.ZERO_WIDTH:
                    // Zero width characters are part of the current cluster
                    if (currentCluster.length > 0) {
                        currentCluster.push(char);
                    } else {
                        // If no current cluster, treat as separate
                        clusters.push(char);
                    }
                    break;

                case this.characterCategories.SUBSCRIPT:
                case this.characterCategories.VOWEL:
                case this.characterCategories.CONSONANT_SHIFTER:
                case this.characterCategories.ROBAT:
                case this.characterCategories.OTHER_SIGN:
                    // These characters attach to the current base
                    if (currentCluster.length > 0) {
                        currentCluster.push(char);
                    } else {
                        // If no base, treat as standalone
                        clusters.push(char);
                    }
                    break;

                default:
                    // For any other category, treat as non-Khmer
                    handleNonKhmer(char);
                    break;
            }
        }

        // Finalize the last cluster
        finalizeCluster();

        return clusters;
    }

    /**
     * Correct Khmer Unicode character order in a cluster
     * Based on Table VIII from the paper
     * @param {string} cluster - Cluster to correct
     * @returns {string} Corrected cluster
     */
    static correctClusterOrder(cluster) {
        if (cluster.length <= 1) return cluster;

        const chars = Array.from(cluster);
        
        // Find the base character (first character)
        const baseIndex = 0; // Base is always first in our segmentation
        const baseChar = chars[baseIndex];

        // Get characters after the base
        const afterBase = chars.slice(1);
        
        // Categorize characters after base
        const categorized = afterBase.map(char => ({
            char,
            category: this.getCharacterCategory(char),
            position: this.getCharacterPosition(char, baseChar)
        }));

        // Reorder based on priority rules from the paper:
        // Priority order: Consonant Shifter > West Subscript > Other Subscripts > Vowels > Other Signs
        categorized.sort((a, b) => {
            const priorityA = this.getCharacterPriority(a);
            const priorityB = this.getCharacterPriority(b);
            return priorityA - priorityB;
        });

        // Reconstruct cluster
        return baseChar + categorized.map(item => item.char).join('');
    }

    /**
     * Get character position relative to base
     * @param {string} char - Character to check
     * @param {string} baseChar - Base character
     * @returns {string} Position category
     */
    static getCharacterPosition(char, baseChar) {
        // Simplified position detection
        // In practice, this would use more complex positioning logic
        const category = this.getCharacterCategory(char);
        
        if (category === this.characterCategories.SUBSCRIPT) {
            // Determine subscript position based on character properties
            // West subscript (left side), East subscript (right side), South subscript (below)
            // This is a simplified version - actual implementation would be more complex
            return 'SUBSCRIPT';
        }
        
        if (category === this.characterCategories.VOWEL) {
            // Determine vowel position
            // North vowel (above), South vowel (below), East vowel (right), West vowel (left)
            return 'VOWEL';
        }
        
        return category;
    }

    /**
     * Get priority for character ordering
     * @param {Object} charInfo - Character information
     * @returns {number} Priority value (lower = higher priority)
     */
    static getCharacterPriority(charInfo) {
        // Priority order from paper:
        // 1. Consonant Shifter (C)
        // 2. West Subscript (WSS)
        // 3. Other Subscripts (SSS, ESS)
        // 4. Vowels (WV, EV, NV, SV)
        // 5. Other Signs (O)
        
        const { category, position } = charInfo;
        
        switch (category) {
            case this.characterCategories.CONSONANT_SHIFTER:
                return 1;
            case this.characterCategories.SUBSCRIPT:
                // West subscript has higher priority
                if (position === 'WEST') return 2;
                return 3; // Other subscripts
            case this.characterCategories.VOWEL:
                return 4;
            case this.characterCategories.OTHER_SIGN:
                return 5;
            case this.characterCategories.ROBAT:
                return 6;
            default:
                return 7;
        }
    }

    /**
     * Map similar-looking characters to canonical forms
     * Specifically handles TA (ត) and DA (ដ) subscripts as mentioned in paper
     * @param {string} cluster - Cluster to normalize
     * @returns {string} Normalized cluster
     */
    static normalizeSimilarCharacters(cluster) {
        // Map TA subscript (ត) and DA subscript (ដ) to same character
        // Both look similar (ត្រ vs ដ្រ)
        let normalized = cluster;
        
        // Map ត្រ (TA subscript) and ដ្រ (DA subscript) to same representation
        normalized = normalized.replace(/\u17D2\u178A/g, '\u17D2\u178A'); // Keep DA as reference
        normalized = normalized.replace(/\u17D2\u178F/g, '\u17D2\u178A'); // Map TA to DA
        
        return normalized;
    }

    /**
     * Process a full sentence: segment into clusters and correct order
     * @param {string} sentence - Khmer sentence to process
     * @returns {Array} Processed clusters
     */
    static processSentence(sentence) {
        // Step 1: Segment into clusters
        const clusters = this.segmentIntoClusters(sentence);
        
        // Step 2: Correct character order in each cluster
        const correctedClusters = clusters.map(cluster => {
            if (this.isKhmerCharacter(cluster.charAt(0))) {
                const corrected = this.correctClusterOrder(cluster);
                const normalized = this.normalizeSimilarCharacters(corrected);
                return normalized;
            }
            return cluster;
        });
        
        return correctedClusters;
    }

    /**
     * Generate Khmer words from clusters using Bi-directional Maximal Matching
     * This is a simplified version - full implementation would require a corpus
     * @param {Array} clusters - Array of clusters
     * @param {Array} corpus - Word corpus for dictionary lookup
     * @returns {Array} Segmented words
     */
    static segmentIntoWords(clusters, corpus = []) {
        if (clusters.length === 0) return [];
        
        // Simple implementation - in reality would use BiMM algorithm
        const words = [];
        let currentWord = [];
        
        for (const cluster of clusters) {
            // If cluster is space or punctuation, finalize current word
            if (cluster.match(/[\s\u200B,.]/) || !this.isKhmerCharacter(cluster.charAt(0))) {
                if (currentWord.length > 0) {
                    words.push(currentWord.join(''));
                    currentWord = [];
                }
                words.push(cluster);
            } else {
                currentWord.push(cluster);
            }
        }
        
        // Add last word if exists
        if (currentWord.length > 0) {
            words.push(currentWord.join(''));
        }
        
        return words;
    }

    /**
     * Display cluster analysis for debugging
     * @param {string} sentence - Sentence to analyze
     */
    static analyzeClusters(sentence) {
        console.log('=== Khmer Cluster Analysis ===');
        console.log(`Input: "${sentence}"`);
        console.log(`Length: ${sentence.length} characters`);
        
        const clusters = this.segmentIntoClusters(sentence);
        const processedClusters = this.processSentence(sentence);
        
        console.log('\nClusters Found:');
        clusters.forEach((cluster, i) => {
            const charCodes = Array.from(cluster).map(c => 
                `U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`
            ).join(' ');
            
            console.log(`  ${i + 1}. "${cluster}" (${cluster.length} chars) [${charCodes}]`);
        });
        
        console.log('\nProcessed Clusters (Order Corrected):');
        processedClusters.forEach((cluster, i) => {
            if (cluster !== clusters[i]) {
                console.log(`  ${i + 1}. "${clusters[i]}" -> "${cluster}"`);
            } else {
                console.log(`  ${i + 1}. "${cluster}" (unchanged)`);
            }
        });
        
        console.log('\nCluster Types:');
        clusters.forEach((cluster, i) => {
            const firstChar = cluster.charAt(0);
            const category = this.getCharacterCategory(firstChar);
            console.log(`  ${i + 1}. "${cluster}" - ${category}`);
        });
        
        return {
            originalClusters: clusters,
            processedClusters: processedClusters,
            clusterCount: clusters.length
        };
    }

    /**
     * Extract Khmer clusters from mixed text
     * @param {string} text - Text containing Khmer and other characters
     * @returns {Array} Only Khmer clusters
     */
    static extractKhmerClusters(text) {
        const allClusters = this.segmentIntoClusters(text);
        return allClusters.filter(cluster => 
            cluster.length > 0 && this.isKhmerCharacter(cluster.charAt(0))
        );
    }

    /**
     * Join clusters back into text with optional delimiter
     * @param {Array} clusters - Array of clusters
     * @param {string} delimiter - Delimiter to insert between clusters
     * @returns {string} Joined text
     */
    static joinClusters(clusters, delimiter = '') {
        return clusters.join(delimiter);
    }

    /**
     * Count statistics for Khmer text
     * @param {string} text - Text to analyze
     * @returns {Object} Statistics
     */
    static getTextStatistics(text) {
        const clusters = this.segmentIntoClusters(text);
        const khmerClusters = this.extractKhmerClusters(text);
        
        return {
            totalCharacters: text.length,
            totalClusters: clusters.length,
            khmerClusters: khmerClusters.length,
            nonKhmerClusters: clusters.length - khmerClusters.length,
            averageClusterLength: clusters.length > 0 ? 
                text.length / clusters.length : 0
        };
    }
}

// Export for module systems
export default Khmer;

// For CommonJS (Node.js):
>>>>>>> 9c9120be8b76f88ac98c70e3e86f780df1b53097
// module.exports = Khmer;