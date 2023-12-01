// Please execute the file, which is main.js, with the command
// node main.js, you'll see the output.hex file
// in the current directory.

// Fatih Erkam Dinler 150119567
// Halil İbrahim Ayan 150119753
// Yakup Mert Aslan 150119765

const functions = require('./helpers')

const INSTRUCTION_BITS = 18

const operand_types = {
    'R': { 'bits': 4, 'negative': false },
    'IMM': { 'bits': 6, 'negative': true },
    'ADDR7': { 'bits': 7, 'negative': false },
    'ADDR10': { 'bits': 10, 'negative': false },
    'PCoffset6': { 'bits': 6, 'negative': true },
    'PCoffset14': { 'bits': 14, 'negative': true },
    'nzp': { 'bits': 3, 'negative': false },
}

const instruction_set = {
    'AND': { 'opcode': '0000', 'operands': ['R', 'R', 'R'] },
    'NAND': { 'opcode': '0001', 'operands': ['R', 'R', 'R'] },
    'NOR': { 'opcode': '0011', 'operands': ['R', 'R', 'R'] },
    'ADD': { 'opcode': '0010', 'operands': ['R', 'R', 'R'] },
    'LD': { 'opcode': '0100', 'operands': ['R', 'R', 'IMM'] },
    'ST': { 'opcode': '0101', 'operands': ['R', 'R', 'IMM'] },
    'ANDI': { 'opcode': '0110', 'operands': ['R', 'R', 'IMM'] },
    'ADDI': { 'opcode': '0111', 'operands': ['R', 'R', 'IMM'] },
    'CMP': { 'opcode': '1000', 'operands': ['R', 'R', 'PCoffset6'] },
    'JUMP': { 'opcode': '1001', 'operands': ['R', 'R', 'PCoffset6'] },
    'JE': { 'opcode': '1010', 'operands': ['R', 'R', 'PCoffset6'] },
    'JA': { 'opcode': '1011', 'operands': ['R', 'R', 'PCoffset6'] },
    'JB': { 'opcode': '1100', 'operands': ['R', 'R', 'PCoffset6'] },
    'JAE': { 'opcode': '1101', 'nzp': ['000', 1], 'operands': ['R', 'ADDR7'] },
    'JBE': { 'opcode': '1110', 'operands': ['R', 'ADDR10'] },
}

const instructions = functions.read_file('input.txt')
const output = ['v2.0 raw']

for (const instruction_line of instructions) {
    const { instruction, parameters } = functions.read_instruction(instruction_line)
    if (instruction in instruction_set) {
        let has_error = false
        let binary_string = instruction_set[instruction]['opcode']
        let i = 0
        let used_bits = binary_string.length

        for (const operand of parameters) {
            if ('nzp' in instruction_set[instruction] && i === instruction_set[instruction]['nzp'][1]) {
                binary_string += instruction_set[instruction]['nzp'][0]
                used_bits += 3
            }

            const operand_type = instruction_set[instruction]['operands'][i]
            const operand_bits = operand_types[operand_type]['bits']

            let operand_value = operand
            if (operand_type === 'R') {
                operand_value = operand.slice(1) // Remove the 'R'
            }

            try {
                operand_value = parseInt(operand_value)
            } catch (error) {
                console.log(`Error: Operand "${operand}" is not valid (${instruction_line})`)
                has_error = true
                continue
            }

            const [min_val, max_val] = functions.dec_range(operand_bits, operand_types[operand_type]['negative'])
            if (operand_value < min_val || operand_value > max_val) {
                console.log(`Error: Operand ${operand_value} out of range (${instruction_line})`)
                has_error = true
                continue
            }

            binary_string += functions.dec_to_bin(operand_value, operand_bits, operand_types[operand_type]['negative'])
            i++
            used_bits += operand_bits
        }

        while (used_bits < INSTRUCTION_BITS) {
            binary_string += '0'
            used_bits++
        }

        if (!has_error) {
            output.push(functions.bin_to_hex(binary_string, 5))
        }
    }
}

functions.save_to_file('output.hex', output)
