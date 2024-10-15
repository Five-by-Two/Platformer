declare const __SERVER_PORT__: number;

declare module '*.svg' {
    const content: React.FC<React.SVGProps<SVGElement>>;
    export default content;
}
