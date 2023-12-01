// Read txt file line by line
const fs = require('fs')

function read_file(file_name) {
    const lines = fs.readFileSync(file_name, 'utf8').split('\n')
    return lines
}

// Convert binary string to hexadecimal with fixed length
function bin_to_hex(binary, length) {
    return parseInt(binary, 2).toString(16).padStart(length, '0')
}

// Calculate binary range
function dec_range(bits, twos_complement = false) {
    if (!twos_complement) {
        return [0, 2 ** bits - 1]
    } else {
        return [(-2) ** (bits - 1), 2 ** (bits - 1) - 1]
    }
}

// Convert decimal number to binary n bits
function dec_to_bin(number, bits, twos_complement = false) {
    if (twos_complement) {
        const s = (number & parseInt('1'.repeat(bits), 2)).toString(2)
        return s.padStart(bits, '0')
    } else {
        return number.toString(2).padStart(bits, '0')
    }
}

// Save list to file with new line
function save_to_file(file_name, data) {
    fs.writeFileSync(file_name, data.join('\n'))
}

// Read instruction line
function read_instruction(instruction_line) {
    const split_line = instruction_line.split(' ')
    const instruction = split_line[0]
    const parameters = split_line.slice(1).join(' ').split(',')
    return { instruction, parameters }
}

module.exports = {
    read_file,
    bin_to_hex,
    dec_range,
    dec_to_bin,
    save_to_file,
    read_instruction
}
