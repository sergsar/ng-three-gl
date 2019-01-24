import { GroupProvider } from './group-provider.service';

export const groupProviderFactory = () : GroupProvider =>
    new GroupProvider();
