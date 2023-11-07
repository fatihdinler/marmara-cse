#!/bin/bash

# Define a function to copy files from the current directory
copyMatchingFiles() {
    wildcard="$1"

    if [[ ! -d copied ]]; then
        mkdir copied
    fi

    for file in $wildcard; do
        if [ -e "$file" ]; then
            cp "$file" copied
        fi
    done
}

# Define a function to copy files from a directory recursively
copyMatchingFilesRecursively() {
    wildcard="$1"
    source_dir="$2"
    target_dir="$3"

    if [[ ! -d "$target_dir" ]]; then
        mkdir -p "$target_dir"
    fi

    for file in $wildcard; do
        if [ -e "$file" ]; then
            cp "$file" "$target_dir"
        fi
    done
}

# Check the number of arguments
if [ "$#" -eq 0 ]; then
    echo "Usage: $0 [-R] <wildcard>"
    exit 1
fi

# Check if the -R option is provided
if [ "$1" == "-R" ]; then
    if [ "$#" -lt 2 ]; then
        echo "Usage: $0 -R <wildcard>"
        exit 1
    fi
    wildcard="$2"

    current_dir=$(pwd)

    # Copy files from the current directory
    copyMatchingFiles "$wildcard"

    # Recursively copy files from subdirectories
    shopt -s globstar
    for dir in ./**/; do
        if [ -d "$dir" ] && [ "$dir" != "./copied/" ]; then
            copyMatchingFilesRecursively "$wildcard" "$current_dir" "$dir/copied/"
        fi
    done
else
    wildcard="$1"

    # Copy files from the current directory
    copyMatchingFiles "$wildcard"
fi
