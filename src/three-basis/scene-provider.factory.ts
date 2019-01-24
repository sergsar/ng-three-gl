import { SceneProvider } from './scene-provider.service';

export const sceneProviderFactory = () : SceneProvider =>
    new SceneProvider();
