// npm will introduce changes to a `package-lock.json` file for optional
// dependencies varying on environment. Disregard from a git diff result when
// only changes are addition of "optional" flag in `package-lock.json` file.
//
// See: https://github.com/npm/npm/issues/17722

// Example usage:
//
// git diff -U0 | xargs -0 node bin/process-git-diff

const hasNonOptionalDiff = !! ( process.argv[ 2 ] || '' )
	.replace( /@@ -\d+ \+\d+,\d+ @@\n-.+\n\+.+,\n\+.+\"optional\": true\n/gm, '' )
	.replace( /diff --git a\/package-lock.json b\/package-lock.json\nindex \w+..\w+ \d+\n--- a\/package-lock.json\n\+\+\+ b\/package-lock.json\n(?!@@)/, '' );

// Exit with error code if, after replace, changes still exist.

process.exit( hasNonOptionalDiff ? 1 : 0 );
