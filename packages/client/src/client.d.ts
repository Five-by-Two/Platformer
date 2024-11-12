declare const __SERVER_PORT__: number;
declare const __EXTERNAL_SERVER_URL__: string;
declare const __INTERNAL_SERVER_URL__: string;

declare module '*.svg' {
    const content: React.FC<React.SVGProps<SVGElement>>;
    export default content;
}
