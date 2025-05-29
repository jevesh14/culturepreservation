import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import type { RootStackParamList } from '../App';

type DiscussionDetailRouteProp = RouteProp<RootStackParamList, 'DiscussionDetail'>;

const DiscussionDetail = () => {
  const route = useRoute<DiscussionDetailRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { id } = route.params;
  const [comment, setComment] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Discussion')}
        >
          <Feather name="camera" size={24} color="black" />
          <Text style={styles.backButtonText}>Back to discussions</Text>
        </TouchableOpacity>

        {/* Main Content */}
        <View style={styles.card}>
          <Text style={styles.title}>Discussion #{id}</Text>

          <View style={styles.contentSection}>
            <Text style={styles.contentText}>
              This is a placeholder for the discussion content. Real discussion data needs to be added here.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Comments</Text>

          <View style={styles.commentsSection}>
            <Text style={styles.noCommentsText}>
              No comments yet for this discussion.
            </Text>
          </View>

          <View style={styles.commentForm}>
            <Text style={styles.commentFormTitle}>Add your comment</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Write your thoughts..."
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Post Comment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButtonText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contentSection: {
    paddingVertical: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginVertical: 24,
  },
  contentText: {
    color: '#666',
    fontSize: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  commentsSection: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 24,
    marginBottom: 24,
  },
  noCommentsText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
  },
  commentForm: {
    marginTop: 32,
  },
  commentFormTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    height: 100,
    marginBottom: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#FF7F00',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DiscussionDetail;
