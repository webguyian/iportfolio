import { REGEX_URL, REGEX_PROTOCOL } from 'modules/safari/constants';
import { useSearch } from 'modules/stocks/hooks';

export const useWebSearch = () => {
  const [searchTerm, inputHandlers, hasSearch] = useSearch();
  const onSubmit = event => {
    const searchString = searchTerm.toLowerCase();
    const isUrl = REGEX_URL.test(searchString);
    const hasProtocol = REGEX_PROTOCOL.test(searchString);
    const url = hasProtocol ? searchString : 'https://' + searchString;
    const googleSearch = 'https://google.com/search?q=';

    event.preventDefault();

    if (isUrl) {
      window.open(url, '_blank');
    } else {
      window.open(googleSearch + encodeURIComponent(searchString), '_blank');
    }

    inputHandlers.onCancel();
    inputHandlers.onBlur();
  };
  const actions = {
    ...inputHandlers,
    onSubmit
  };

  return [actions, hasSearch];
};
