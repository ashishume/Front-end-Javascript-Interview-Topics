import App from '../App';
import SelectableGrid from '../Projects/Selectable-Grid';
import GridLights from '@/Projects/Grid-lights';
import VerticalDivider from '@/Projects/VerticalDivider';
import Photo from '@/Projects/Tag';
import ResizeEvent from '@/Projects/ResizeEvent-with-throttler';
import MakeApiCallsInChunk from '@/Projects/Make-API-calls-in-chunk';
import Tabs from '@/Projects/Tabs';
import TypewriterEffect from '@/Projects/TypingEffectText';
import SwitchComponent from '@/Projects/SwitchComponent';
import Walkthrough from '@/Projects/WalkThrough';
import Search from '@/Projects/SearchWithDebounce';
import ImageModalParent from '@/Projects/Image-Modal';
import MultiStepper from '@/Projects/Multi-Stepper/multi-stepper';
import NestedCheckboxes from '@/Projects/Nested-Checkboxes';
import NestedCheckbox from '@/Projects/Checkbox-Nested';
import RenderItemComponent from '@/Projects/RenderItem';
import Languagei18next from '@/Projects/i18n-accessiblity';
import DynamicForm from '@/Projects/Dynamic-Input-Form';
import TableWithNestedObjects from '@/Projects/Table-nested-objects';
import ParentClassComponent from '@/Projects/React-Class-based-comp';
import TableSorting from '@/Projects/Table-with-sorting';
import DynamicFolder from '@/Projects/FolderStructure(Dynamic)/Parent';
import { FolderData } from '@/Projects/FolderStructure(Recursive)/FolderData';
import FolderComponent from '@/Projects/FolderStructure(Recursive)/FolderComponent';
import FolderStructure2 from '@/Projects/FolderStructure(Recursive)/FolderStructure(Another Example)';
import SlideShow from '@/Projects/SlideShow';
import StopWatchComp from '@/Projects/StopWatch';
import InfiniteScroll from '@/Projects/Infinite-Scroll-with-chat-bubble/infinite.scroll-2';
import InfiniteScrolls from '@/Projects/Infinite-Scroll-with-chat-bubble/infinite-with-intersection-observer';
import AxiosContainer from '@/Projects/AbortController';
import PureClassBasedComponent from '@/Projects/Pure-Components';
import Phone from '@/Projects/OTP-login';
import Pagination from '@/Projects/Pagination';
import LazyParentComp from '@/Projects/CodeSplitting';
import SSRPagination from '@/Projects/Table-Pagination-SSR';
import CommentsSection from '@/Projects/CommentsSection';
import EcommerceRoutes from '@/Projects/e-commerce/ecommerce-routes';
import TrelloBoard from '@/Projects/Trello-Board';
import ReactPortal from '@/Projects/React-Portals';
import SimpleProgressBarComp from '@/Projects/Progress-bar-with-css-js';
import TransferList from '@/Projects/Transfer-List';
import IframePostMessage from '@/Projects/Iframe-post-message';
import Accordion from '@/Projects/Accordion';
import TrafficLights from '@/Projects/Traffic-Lights';
import StarRating from '@/Projects/Star-Rating';
import DelayApiCall from '@/Projects/Delay-API-call-using-use-throttler';
import AutoComplete from '@/Projects/AutoComplete-with-highlight';
import { MouseCapture } from '@/Projects/Mouse-Position-Capture-With-Click';
import BreadcrumbsComponent from '@/Projects/Breadcrumbs';
import TemperatureConvertor from '@/Projects/Temperature-Convertor';
import MemoryGame from '@/Projects/Memory-Game';
import WhackAMole from '@/Projects/Whack-A-Mole';
import PollManager from '@/Projects/Poll-between-2-choices';
import LikeButton from '@/Projects/LikeButton';
import CanvasDrawing from '@/Projects/Canvas-Drawing';
import ProductListing from '@/Projects/Product-Listing-Page';
import MatchCountryCapitals from '@/Projects/Match-Country-Capitals-Game';
import SnackbarHome from '@/Projects/Snackbar';
import StarRatingAdvanced from '@/Projects/Star-Rating-Content-stack-interview';
import UnControlledComp from '@/Projects/UncontrolledVsControlled';
import FindDomElementViaClick from '@/Projects/Find-DOM-Element-Via-Click';
import ExpenseSplitter from '@/Projects/ExpenseSplitter';
import GoogleDriveFileSystem from '@/Projects/GoogleDriveFileSystem/practice';
import MovieBooking from '@/Projects/Movie-Booking';
import SortList from '@/Projects/Sort-List';
import SearchWithVirtualisation from '@/Projects/Search-bar-with-virtualisation';
import VirtualList from '@/Projects/VirtualList';
import OfflineFirstApp from '@/Projects/Offline-first-app';
import { AppRoute } from './route.types';
import CircleOverlap from '@/Projects/circle-overlap-uber-question';

const sourceFile = 'general.routes.tsx';

export const generalRoutes: AppRoute[] = [
  { routeName: '/', component: <App />, sourceFile },
  { routeName: '/find-dom-el-via-click', component: <FindDomElementViaClick />, sourceFile },
  {
    routeName: '/search-bar-with-virtualisation',
    component: <SearchWithVirtualisation />,
    sourceFile
  },
  { routeName: '/offline-first-app', component: <OfflineFirstApp />, sourceFile },
  { routeName: '/iframe-post-message', component: <IframePostMessage />, sourceFile },
  { routeName: '/movie-booking', component: <MovieBooking />, sourceFile },
  { routeName: '/virtual-list', component: <VirtualList />, sourceFile },
  { routeName: '/expense-splitter', component: <ExpenseSplitter />, sourceFile },
  { routeName: '/controlled-uncontrolled', component: <UnControlledComp />, sourceFile },
  { routeName: '/snackbar', component: <SnackbarHome />, sourceFile },
  { routeName: '/match-country-capitals', component: <MatchCountryCapitals />, sourceFile },
  { routeName: '/product-listing', component: <ProductListing />, sourceFile },
  { routeName: '/canvas-drawing', component: <CanvasDrawing />, sourceFile },
  { routeName: '/like-button', component: <LikeButton />, sourceFile },
  { routeName: '/google-drive', component: <GoogleDriveFileSystem />, sourceFile },
  { routeName: '/polling-booth', component: <PollManager />, sourceFile },
  { routeName: '/memory-game', component: <MemoryGame />, sourceFile },
  { routeName: '/breadcrumbs', component: <BreadcrumbsComponent />, sourceFile },
  { routeName: '/temperature-convertor', component: <TemperatureConvertor />, sourceFile },
  { routeName: '/api-cancel-with-throttler', component: <DelayApiCall />, sourceFile },
  { routeName: '/star-rating', component: <StarRating />, sourceFile },
  { routeName: '/star-rating-advanced', component: <StarRatingAdvanced />, sourceFile },
  { routeName: '/transfer-list', component: <TransferList />, sourceFile },
  { routeName: '/traffic-light', component: <TrafficLights />, sourceFile },
  { routeName: '/react-portal', component: <ReactPortal />, sourceFile },
  { routeName: '/trello-board', component: <TrelloBoard />, sourceFile },
  { routeName: '/selectable-grid', component: <SelectableGrid />, sourceFile },
  { routeName: '/grid-light', component: <GridLights />, sourceFile },
  { routeName: '/vertical-resizer', component: <VerticalDivider />, sourceFile },
  { routeName: '/resize', component: <ResizeEvent />, sourceFile },
  { routeName: '/make-api-calls-in-chunk', component: <MakeApiCallsInChunk />, sourceFile },
  { routeName: '/typing-effect-text', component: <TypewriterEffect />, sourceFile },
  { routeName: '/switch-component', component: <SwitchComponent />, sourceFile },
  { routeName: '/walkthrough', component: <Walkthrough />, sourceFile },
  { routeName: '/tabs', component: <Tabs />, sourceFile },
  { routeName: '/accordion', component: <Accordion />, sourceFile },
  { routeName: '/sort-list', component: <SortList />, sourceFile },
  { routeName: '/whack-a-mole', component: <WhackAMole />, sourceFile },
  { routeName: '/mouse-capture', component: <MouseCapture />, sourceFile },
  { routeName: '/search', component: <Search />, sourceFile },
  { routeName: '/auto-complete', component: <AutoComplete />, sourceFile },
  { routeName: '/comments-section', component: <CommentsSection />, sourceFile },
  { routeName: '/image-modal', component: <ImageModalParent />, sourceFile },
  { routeName: '/progress-bar-js-css', component: <SimpleProgressBarComp />, sourceFile },
  { routeName: '/stepper', component: <MultiStepper />, sourceFile },
  { routeName: '/nested-checkboxes', component: <NestedCheckboxes />, sourceFile },
  { routeName: '/nested-checkbox', component: <NestedCheckbox />, sourceFile },
  { routeName: '/render-item', component: <RenderItemComponent />, sourceFile },
  { routeName: '/i18next', component: <Languagei18next />, sourceFile },
  { routeName: '/dynamic-form', component: <DynamicForm />, sourceFile },
  { routeName: '/table-nested-object', component: <TableWithNestedObjects />, sourceFile },
  { routeName: '/table-ssr-pagination', component: <SSRPagination />, sourceFile },
  { routeName: '/table-with-sorting', component: <TableSorting />, sourceFile },
  { routeName: '/react-class', component: <ParentClassComponent />, sourceFile },
  { routeName: '/dynamic-folder', component: <DynamicFolder />, sourceFile },
  { routeName: '/pure-component', component: <PureClassBasedComponent />, sourceFile },
  { routeName: '/otp-login', component: <Phone />, sourceFile },
  { routeName: '/nested-folder', component: <FolderComponent explorer={FolderData} />, sourceFile },
  { routeName: '/photo-tagging', component: <Photo />, sourceFile },
  { routeName: '/ecommerce/*', component: <EcommerceRoutes />, sourceFile },
  { routeName: '/infinite-scroll', component: <InfiniteScrolls />, sourceFile },
  { routeName: '/infinite-scroll-2', component: <InfiniteScroll />, sourceFile },
  { routeName: '/abort-controller', component: <AxiosContainer />, sourceFile },
  { routeName: '/folder-structure-2', component: <FolderStructure2 />, sourceFile },
  { routeName: '/pagination', component: <Pagination />, sourceFile },
  { routeName: '/slide-show', component: <SlideShow />, sourceFile },
  { routeName: '/stop-watch', component: <StopWatchComp />, sourceFile },
  { routeName: '/code-splitting', component: <LazyParentComp />, sourceFile },
  {
    routeName: '/circle-overlap',
    component: <CircleOverlap />,
    sourceFile
  }
];
