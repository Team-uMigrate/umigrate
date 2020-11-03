# Converts a list of strings to a tuple in the format (int, str)
def convert_to_tuple(choices):
    return [(i, choice) for i, choice in enumerate(choices)]


# Trigger a division-by-zero error
def trigger_error(request):
    division_by_zero = 1 / 0


def get_length(choices):
    return len(convert_to_tuple(choices=choices))


# Choices for model fields
class Choices:
    PRONOUN_CHOICES = convert_to_tuple(
        [
            "None",
            "He/Him",
            "She/Her",
            "They/Them",
            "Other",
        ]
    )
    SEASON_CHOICES = convert_to_tuple(
        [
            "Winter",
            "Spring",
            "Fall",
        ]
    )
    PRICE_CHOICES = convert_to_tuple(
        [
            "Free",
            "$",
            "$$",
            "$$$",
            "$$$$",
            "$$$$$",
        ]
    )
    REGION_CHOICES = convert_to_tuple(
        [
            "Waterloo",
            "Toronto",
            "Brampton",
            "Ottawa",
        ]
    )
    PROGRAM_CHOICES = convert_to_tuple(
        [
            "Unknown",
            "Engineering",
            "Arts",
            "Mathematics",
            "Science",
            "Applied Health Sciences",
            "Environment",
            "Theology",
            "Graduate Studies",
            "Independent Studies",
            "Interdisciplinary",
            "Conrad Grebel",
            "Renison",
            "St. Pauls",
            "St. Jeromes",
        ]
    )
    TERM_CHOICES = convert_to_tuple(
        [
            "1A",
            "1B",
            "W1",
            "2A",
            "W2",
            "2B",
            "W3",
            "3A",
            "W4",
            "3B",
            "W5",
            "W6",
            "4A",
            "4B",
        ]
    )
    AD_CATEGORY_CHOICES = convert_to_tuple(
        [
            "Electronics",
            "Books",
            "Food",
            "Other",
        ]
    )
    LISTING_CATEGORY_CHOICES = convert_to_tuple(
        [
            "Condominium",
            "Townhouse",
            "Apartment",
        ]
    )
    NOTIFICATION_PRIVACY_CHOICES = convert_to_tuple(
        [
            "All",
            "Following",
            "None",
        ]
    )
    CURRENCY_CHOICES = convert_to_tuple(
        [
            "CAD",
            "USD",
        ]
    )
    LANGUAGE_CHOICES = convert_to_tuple(
        [
            "English",
            "French",
        ]
    )
    JOB_TYPE_CHOICES = convert_to_tuple(
        [
            "Full-time",
            "Internship",
        ]
    )
    ROOM_CHOICES = convert_to_tuple(
        [
            "Public",
            "Private",
            "Direct Messaging",
        ]
    )


class MockData:
    MOCK_ADDRESSES = [
        "28 Lade St, Coorparoo, QLD 4151",
        "297 Randall Dr Riverview NB E1B",
        "30a, High St, Lyndhurst, SO43 7BG",
        "500 Kingston Rd Toronto ON M4L",
        "17 Whitaker Ave Toronto ON M6J",
        "127 Scarborough Rd Toronto ON M4E",
        "1210 Don Mills Rd North York ON M3B",
        "717 Broadview Ave Toronto ON M4K",
        "48 Norwood Rd Toronto ON M4E 2S2",
        "300 Silver Birch Ave Toronto ON M4E",
    ]