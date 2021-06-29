from typing import List
from django.db.models import Model
from rest_framework import serializers


class ModelSerializerExtension(serializers.ModelSerializer):
    """
    An abstract model serializer class that allows for excluding fields and including related fields.
    """

    class Meta:
        model: Model = None
        """
        The model class to serialize. Must be overwritten.
        """

        fields: List[str] or str = None
        """
        The list of field names to serialize or '__all__'. Must be overwritten.
        """

        extra_fields: List[str] = []
        exclude_fields: List[str] = []

    def get_field_names(self, declared_fields, info):
        fields = super(ModelSerializerExtension, self).get_field_names(
            declared_fields, info
        )

        # add the fields listed in extra_fields
        if getattr(self.Meta, "extra_fields", []):
            fields = fields + self.Meta.extra_fields

        # remove the fields listed in exclude_fields
        if getattr(self.Meta, "exclude_fields", []):
            fields = [
                field for field in fields if field not in self.Meta.exclude_fields
            ]

        return fields
