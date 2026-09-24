import { useLocation } from 'react-router';
import { Entry, entryMeta } from '../entry';
import type { Route } from './+types/unprefixed';
export function meta({ location }: Route.MetaArgs) { return entryMeta(location.pathname.replace(/\/+$/, '')); }
export default function Unprefixed() { return <Entry path={useLocation().pathname.replace(/\/+$/, '')} />; }
