<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <defs>
            <mask id="error-mask">
                <rect x="0" y="0" width="24" height="24" fill="white" />
                <rect x="11" y="8" width="2" height="5" fill="black" />
                <rect x="11" y="15" width="2" height="2" fill="black" />
            </mask>
        </defs>

        <rect
            x="3"
            y="3"
            width="18"
            height="18"
            fill="currentColor"
            mask="url(#error-mask)"
        />
    </svg>
</template>
