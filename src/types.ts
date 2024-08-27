declare module '@mappable-world/mappable-types/import' {
    interface Import {
        (pkg: '@mappable-world/mappable-cartesian-projection'): Promise<typeof import('./index')>;
    }
}

export {};
