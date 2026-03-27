#!/bin/bash
# Source this script to cd into the content directories:
#   source content.sh        — goes to content root
#   source content.sh blog   — goes to blog posts
#   source content.sh papers — goes to papers

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/src/content"

case "${1:-}" in
  blog)   cd "$DIR/blog" ;;
  papers) cd "$DIR/papers" ;;
  *)      cd "$DIR" ;;
esac
