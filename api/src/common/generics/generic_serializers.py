from rest_framework import serializers


# Serializes a generic model
class GenericSerializer(serializers.ModelSerializer):

    class Meta:
        # Override required for model; it should be a model class
        model = None
        # Override required for fields; it should be a list of fields for the model
        fields = None
        # Override if there are addition fields to serialize
        extra_fields = None
        # Override if there are fields that should not be serialized
        exclude_fields = []

    def get_field_names(self, declared_fields, info):
        fields = super(GenericSerializer, self).get_field_names(declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            fields = fields + self.Meta.extra_fields

        if getattr(self.Meta, 'exclude_fields', []):
            fields = [field for field in fields if field not in self.Meta.exclude_fields]
        
        return fields


# Serializes a generic resource model
class GenericPostSerializer(GenericSerializer):
    is_liked = serializers.SerializerMethodField()

    def get_is_liked(self, instance):
        return instance.liked_users.filter(id=self.context['request'].user.id).exists()


# Serializes a generic comment model
class GenericCommentSerializer(GenericSerializer):
    is_liked = serializers.SerializerMethodField()

    def get_is_liked(self, instance):
        return instance.liked_users.filter(id=self.context['request'].user.id).exists()
