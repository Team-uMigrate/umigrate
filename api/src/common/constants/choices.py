# Converts a list of strings to a tuple in the format (int, str)
def convert_to_tuple(choices):
    return [(i, choice) for i, choice in enumerate(choices)]


# Converts a list of strings to a map with the strings as keys and the indexes as values
def convert_to_map(choices):
    return {k: v for v, k in enumerate(choices)}


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
    COMMUNITY_CHOICES = convert_to_tuple(
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
    JOB_TYPE_CHOICES = convert_to_tuple(
        [
            "Full-time",
            "Internship",
        ]
    )
    CONNECTION_STATUS_CHOICES = convert_to_map(
        [
            "Connected",
            "Request Sent",
            "Request Received",
            "Not Connected",
        ]
    )
    LIKES_FIELD, MESSAGE_FIELD, COMMENT_FIELD, TAG_FIELD, CONNECTION_FIELD = (
        1,
        2,
        3,
        4,
        5,
    )
    NOTIFICATION_CHOICES = (
        (LIKES_FIELD, "Shared_Item_Likes"),
        (MESSAGE_FIELD, "Messages_Received"),
        (COMMENT_FIELD, "Shared_Item_Comments"),
        (TAG_FIELD, "Shared_Item_Tag"),
        (CONNECTION_FIELD, "Connection_Request"),
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
