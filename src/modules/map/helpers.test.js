/* eslint-disable camelcase */
import * as helpers from 'modules/map/helpers';

describe('Map helpers', () => {
  const places = [
    {
      formatted_address: 'One Infinite Loop, Cupertino, CA 95014, USA',
      formatted_phone_number: '(408) 606-5775',
      geometry: {
        location: {
          lat: 37.3316756,
          lng: -122.030189
        },
        viewport: {
          south: 37.33037986970849,
          west: -122.0318504802915,
          north: 37.33307783029149,
          east: -122.0291525197085
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png',
      id: '078b7998668589cc9073556d144b27f00b507a38',
      international_phone_number: '+1 408-606-5775',
      name: 'Apple Infinite Loop',
      opening_hours: {
        open_now: false,
        periods: [
          {
            close: {
              day: 0,
              time: '1800',
              hours: 18,
              minutes: 0,
              nextDate: 1586739600000
            },
            open: {
              day: 0,
              time: '1000',
              hours: 10,
              minutes: 0,
              nextDate: 1586710800000
            }
          },
          {
            close: {
              day: 1,
              time: '1900',
              hours: 19,
              minutes: 0,
              nextDate: 1586829600000
            },
            open: {
              day: 1,
              time: '0900',
              hours: 9,
              minutes: 0,
              nextDate: 1586793600000
            }
          },
          {
            close: {
              day: 2,
              time: '1900',
              hours: 19,
              minutes: 0,
              nextDate: 1586916000000
            },
            open: {
              day: 2,
              time: '0900',
              hours: 9,
              minutes: 0,
              nextDate: 1586880000000
            }
          },
          {
            close: {
              day: 3,
              time: '1900',
              hours: 19,
              minutes: 0,
              nextDate: 1587002400000
            },
            open: {
              day: 3,
              time: '0900',
              hours: 9,
              minutes: 0,
              nextDate: 1586966400000
            }
          },
          {
            close: {
              day: 4,
              time: '1900',
              hours: 19,
              minutes: 0,
              nextDate: 1587088800000
            },
            open: {
              day: 4,
              time: '0900',
              hours: 9,
              minutes: 0,
              nextDate: 1587052800000
            }
          },
          {
            close: {
              day: 5,
              time: '1900',
              hours: 19,
              minutes: 0,
              nextDate: 1587175200000
            },
            open: {
              day: 5,
              time: '0900',
              hours: 9,
              minutes: 0,
              nextDate: 1587139200000
            }
          },
          {
            close: {
              day: 6,
              time: '1800',
              hours: 18,
              minutes: 0,
              nextDate: 1587258000000
            },
            open: {
              day: 6,
              time: '1000',
              hours: 10,
              minutes: 0,
              nextDate: 1587229200000
            }
          }
        ],
        weekday_text: [
          'Monday: 9:00 AM – 7:00 PM',
          'Tuesday: 9:00 AM – 7:00 PM',
          'Wednesday: 9:00 AM – 7:00 PM',
          'Thursday: 9:00 AM – 7:00 PM',
          'Friday: 9:00 AM – 7:00 PM',
          'Saturday: 10:00 AM – 6:00 PM',
          'Sunday: 10:00 AM – 6:00 PM'
        ]
      },
      place_id: 'ChIJDx2VxLa1j4AR--kx601BUbY',
      plus_code: {
        compound_code: '8XJ9+MW Cupertino, California, United States',
        global_code: '849V8XJ9+MW'
      },
      price_level: 3,
      rating: 4.3,
      reference: 'ChIJDx2VxLa1j4AR--kx601BUbY',
      reviews: [
        {
          author_name: 'Ben Petersen',
          author_url:
            'https://www.google.com/maps/contrib/113167349640566298664/reviews',
          language: 'en',
          profile_photo_url:
            'https://lh3.ggpht.com/-yklbhwOB31Y/AAAAAAAAAAI/AAAAAAAAAAA/Kne5XL3mn4M/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg',
          rating: 5,
          relative_time_description: 'a month ago',
          text:
            'I loved the Café. Eating here with my family felt very surreal. So much technological history was made in the buildings around where I was eating a meatball sub. I felt just a little bit more emotionally connected to the phone in my pocket... oh and the food was good too!',
          time: 1583205839
        },
        {
          author_name: 'eGarWish .',
          author_url:
            'https://www.google.com/maps/contrib/108839354936973468622/reviews',
          language: 'en',
          profile_photo_url:
            'https://lh4.ggpht.com/-SD_t0iZoJ2M/AAAAAAAAAAI/AAAAAAAAAAA/GU43-q3PMyI/s128-c0x00000000-cc-rp-mo-ba6/photo.jpg',
          rating: 5,
          relative_time_description: '2 months ago',
          text:
            "It's so awesome to visit and feel the energy of this place. It was totally worth it. Great job Steve Jobs may your saul rest in peace",
          time: 1581392455
        },
        {
          author_name: 'Tiffany',
          author_url:
            'https://www.google.com/maps/contrib/109178470947561940544/reviews',
          language: 'en',
          profile_photo_url:
            'https://lh4.ggpht.com/-Mm8p5lrMngA/AAAAAAAAAAI/AAAAAAAAAAA/Lm4I8OUy2u4/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg',
          rating: 3,
          relative_time_description: 'a month ago',
          text:
            'Enthusiastic staff. They sell (overpriced) shirts, mugs, and other unique items not found in any other Apple store. Worth a visit if you’re an Apple fan.',
          time: 1581961455
        },
        {
          author_name: 'sorabh vijay',
          author_url:
            'https://www.google.com/maps/contrib/109654022758795260801/reviews',
          language: 'en',
          profile_photo_url:
            'https://lh4.ggpht.com/-EfCgdnUxCKA/AAAAAAAAAAI/AAAAAAAAAAA/HSocQfvWtX4/s128-c0x00000000-cc-rp-mo/photo.jpg',
          rating: 5,
          relative_time_description: 'a month ago',
          text:
            'Not much crowded. Plenty of retail store employees. Not as fancy as Apple Park visitor center but better for quick visit.',
          time: 1582013141
        },
        {
          author_name: 'Sony O',
          author_url:
            'https://www.google.com/maps/contrib/114199073202949290919/reviews',
          language: 'en',
          profile_photo_url:
            'https://lh5.ggpht.com/-hYQjg3UUhL4/AAAAAAAAAAI/AAAAAAAAAAA/hcBa7LpUfZo/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg',
          rating: 3,
          relative_time_description: '4 months ago',
          text:
            "It's  average. Just like any other apple store. It is popular with the tourist. They love taking pictures of the apple sign outside the store ╮(╯▽╰)╭",
          time: 1575406781
        }
      ],
      scope: 'GOOGLE',
      types: [
        'electronics_store',
        'point_of_interest',
        'store',
        'establishment'
      ],
      url: 'https://maps.google.com/?cid=13137353390930651643',
      user_ratings_total: 3210,
      utc_offset: -420,
      vicinity: 'One Infinite Loop, Cupertino',
      website: 'https://www.apple.com/retail/infiniteloop?cid=aos-us-seo-maps',
      html_attributions: [],
      utc_offset_minutes: -420
    }
  ];
  const map = { fitBounds: jest.fn() };

  it('handles addSavedMarkers', () => {
    expect(helpers.addSavedMarkers(places, map)).toHaveLength(1);
  });

  it('handles onPlaceSelected', () => {
    const maps = global.google.maps;
    const searchBox = new maps.places.SearchBox();

    searchBox.getPlaces.mockReturnValueOnce(places);

    expect(helpers.onPlaceSelected(searchBox, map)).toHaveLength(1);
    expect(map.fitBounds).toHaveBeenCalled();
  });

  it('handles onPlaceSelected with no places', () => {
    const maps = global.google.maps;
    const searchBox = new maps.places.SearchBox();

    expect(helpers.onPlaceSelected(searchBox, map)).toEqual();
  });

  it('handles toggleMarker', () => {
    const marker = {
      name: 'marker1',
      get: jest.fn(() => false),
      set: jest.fn(),
      setIcon: jest.fn(),
      setMap: jest.fn()
    };

    expect(helpers.toggleMarker(marker)).toEqual(true);
    expect(marker.setIcon).toHaveBeenCalledWith({ fillOpacity: 1 });

    marker.get.mockReturnValueOnce(true);
    expect(helpers.toggleMarker(marker)).toEqual(false);
    expect(marker.setIcon).toHaveBeenCalledWith({ fillOpacity: 0.2 });
  });
});
