// Import the built-in 'fs' module to handle file system operations like reading files
import fs from 'fs';

// Import 'csv-parser' to convert CSV file content into JavaScript objects
import csv from 'csv-parser';

/**
 * Loads and parses a CSV file into an array of JavaScript objects.
 * @param {string} filePath - Absolute path to the CSV file
 * @param {Function} transformFn - Optional function to transform each row
 * @returns {Promise<Array<Object>>} - Resolves with parsed and transformed data
 */
export function loadCSV(filePath, transformFn = (row) => row) {
  return new Promise((resolve, reject) => {
    const results = []; // This array will collect the parsed CSV rows

    // Start reading the CSV file as a stream
    fs.createReadStream(filePath)
      .pipe(csv()) // Parse each line from CSV into a plain JS object
      .on('data', (row) => results.push(transformFn(row))) // Apply transformation and add to results
      .on('end', () => resolve(results)) // Once done, resolve the Promise with the results
      .on('error', (err) => reject(err)); // Handle any read or parse errors
  });
}