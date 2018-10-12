// npm will introduce changes to a `package-lock.json` file for optional
// dependencies varying on environment. Disregard from a git diff result when
// only changes are addition of "optional" flag in `package-lock.json` file.
//
// See: https://github.com/npm/npm/issues/17722

// Example usage:
//
// git diff -U0 | xargs -0 node bin/process-git-diff

// Example input:
//
// diff --git a/package-lock.json b/package-lock.json
// index e8c8a25dc..251af8689 100644
// --- a/package-lock.json
// +++ b/package-lock.json
// @@ -14373 +14373,2 @@
// -                       "dev": true
// +                       "dev": true,
// +                       "optional": true
// @@ -14648 +14649,2 @@
// -                       "dev": true
// +                       "dev": true,
// +                       "optional": true

const hasNonOptionalDiff = !! ( process.argv[ 2 ] || '' )
	// Strip individual diffs of optional-only.
	.replace( /@@ -\d+ \+\d+,\d+ @@\n(-.+\n\+.+,\n)?\+.+\"optional\": true,?\n/gm, '' )
	// If no more line diffs remain after above, remove diff heading for file.
	.replace( /diff --git a\/package-lock.json b\/package-lock.json\nindex \w+..\w+ \d+\n--- a\/package-lock.json\n\+\+\+ b\/package-lock.json\n(?!@@)/, '' );

process.stdout.write( '\n\n-------\n\n' );

process.stdout.write( process.argv[ 2 ] );

process.stdout.write( '\n\n-------\n\n' );

process.stdout.write( ( process.argv[ 2 ] || '' )
	// Strip individual diffs of optional-only.
	.replace( /@@ -\d+ \+\d+,\d+ @@\n-.+\n\+.+,\n\+.+\"optional\": true\n/gm, '' )
	// If no more line diffs remain after above, remove diff heading for file.
	.replace( /diff --git a\/package-lock.json b\/package-lock.json\nindex \w+..\w+ \d+\n--- a\/package-lock.json\n\+\+\+ b\/package-lock.json\n(?!@@)/, '' ) );

// Exit with error code if, after replace, changes still exist.
process.exit( hasNonOptionalDiff ? 1 : 0 );
